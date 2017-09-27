---
layout: post
title: Weapon trajectory in unity
date: 2017-09-27
published: true
draft: true
---

Firstly i want to start off by saying this post will include a lot of maths and code.

My goal was to get the trajectory of a grenade to start from the weapon and land at a point in front of the player's head/camera. The problem with this is that the weapon is offset in all 3 dimensions so things get complicated fast. Another minor problem was getting the trajectory path shown to the player line up with the projectile once it was launched.

To display the trajectory you can used a simple `LineRenderer`, and to make the projectile move you can apply motion to a `Rigidbody`.

To get the trajectory started you can simply think of it in 2 dimensions, height, and distance. Starting with values for speed and angle of launch I could can use the [trajectory formulas](https://en.wikipedia.org/wiki/Trajectory).

I decided that the start of the trajectory path was more important so i made the thickness of the `LineRenderer` decrease over its path. By doing this i dont have to worry about if the projectile is going to land below the height it started at because the line would be near unseeable by that point anyway.

The path the takes follows this equation of motion:

```
y = x*tan(a) - (x^2 * gravity) / (2 * speed^2 + cos^2(launch angle))
```

With this equation we can render the path. To do this we need to pick either `x` or `y` and vary them to order to calculate the other one and plot the values at each point. As you should be able to tell from the equation, we are going to vary `x` and calculate `y`.

We are going to take values for x at equal distances from 0 to the distance the projectile hits the ground. 

```csharp
for (int i = 0; i < numberOfLines +1; i++)
{
    float t = (float)i / numberOfLines;
    float x = x * trajectoryDistance;

    // calculate y
}
```

Initially i through i could use the simple distnace equation as we do not care about if the projectile lands below the start of not

```
Distance = (speed^2 * sin(2 * lanuch angle)) / gravity
```

However this formula does not work if you have negative angles, so when ever the play looked down the trajectory would just flip and face behind the player. To fix this we need to use a formula that takes initial height into account, Derivation can be found [here](https://en.wikipedia.org/wiki/Range_of_a_projectile).

Converting that formula we get this

```csharp
float TrajectoryDistance(float speed, float angle, float gravity, float initialHeight = 0f)
{
    float xSpeed = Mathf.Cos(angle) * speed; 
    float ySpeed = Mathf.Sin(angle) * speed;
    return (xSpeed / gravity) * (ySpeed + Mathf.Sqrt(ySpeed * ySpeed + 2f * gravity * initialHeight));
}
```

Now we have all of the parts to get our trajectory to work in 2 dimensions. So putting them all together in a way that our `LineRenderer` can use

```csharp
void RenderArc(float speed, float angle, int numberOfLines)
{
    // 1 point for the start of each line + 1 at the end of the arc.
    this.lineRenderer.positionCount = numberOfLines + 1;

    Vector3[] positions = new Vector3[numberOfLines + 1]; 

    // the angle must be in radian in order to use Unities Mathf
    float radianAngle = Mathf.Deg2Rad * angle;

    // we want the negative value as our formula's assume gravity is negative.
    float gravity = (- Physics.gravity.y);

    float trajectoryDistance = TrajectoryDistance(speed, radianAngle, gravity);
    
    for (int i = 0; i < numberOfLines +1; i++)
    {
        float t = (float)i / numberOfLines;
        float x = x * trajectoryDistance;

        float y = x * Mathf.Tan(radianAngle) - ((gravity * x * x) / (2 * speed * speed * Mathf.Cos(radianAngle) * Mathf.Cos(radianAngle)));

         
        position[i] = (y * Vector3.up) + (x * transform.forward) + transform.position;
    }

    lineRenderer.SetPositions(positions);
}
```


A few notes about the position as we convert `x` and `y` to a vector. `y` should be the global up. `x` should be the local forward, this is so that the trajectory is always facing the same direction as our player. Lastly we need to make sure that the trajectory moves with the player.

We should not have a working trajectory from the transform that has this script attached. Now in order to make this work with an offset only requires minor changes.

First we should set up our objects in unity so that this will be easy to do. The `LineRenderer` and script are put on a child of the weapon and the weapon is a child of the player's head. In my setup the player's head controls rotation up and down, while the player(root) object controls rotation left and right.

*** Image of player set up ***

The target location for the grenade will be in the forward direction from the player object, but the starting location of the grenade will be the weapon.

The height offset is easy to sort out, just add the local `y` position of the weapon into the `TrajectoryDistance` function.
```csharp
TrajectoryDistance(speed, radianAngle, gravity, transform.position.y);
```

In order to calculate the direction you will need the player's transform, the weapon's transform and the trajectory distance. we will add vectors as show in the diagram. We do not want the result vector to have any y component as we have already dealt with this. Lastly we normal the vector as we only want it's direction.

*** diagram of vectors *** 
```csharp
Vector3 CalculateTrajectoryDirection()
{
    Vector3 direction = 
        (player.transform.forward * this.TrajectoryDistance
        + player.transform.position
        - weapon.transform.position);

    // we only want the vector in the x/z direction
    direction.y = 0;

    return direction.normalized;
}
```

We can now use that direction to replace transform.forward
```csharp
position[i] = (y * Vector3.up) + (x * direction) + transform.position;
```


The angle the grenade is launched at can be calculated in a few ways, the easiest way with this set up is to use the player's head rotation. we also need to clamp the angle so between -90 and 90 so the player can only throw it forward. I have also given the trajectory an initial angle of 30 degrees.

```csharp
float CalculateAngle() {
    float headAngle = -1 *  playerHead.transform.rotation.eulerAngles.x;
    float angle = ClampAngle(headAngle + 30, -90, 89.99);
    return angle;
}

float ClampAngle(float angle, float min, float max)
{
    // makes sure angle is between -180 and 180
    while (angle <= -180)
    {
        angle += 360;
    }
    while (angle > 180)
    {
        angle -= 360;
    }

    // clamps angle within min and max
    return Mathf.Clamp(angle, min, max);
}
```
*the angle may need to negative depending of the setup, in my case it is.*

Moving on to the grenade it's self. To make this work with the values we have already calculated we can use `rigidbody.velocity` when we launch the grenade and then leave unity to deal with the rest. To calculate the velocity we can use the following

```csharp
Vector3 calculateVelocity(float speed, Vector3 direction, float radianAngle)
{
    float yDirection = Mathf.Tan(radianAngle);
    
    Vector3 finalDirection = new Vector3(direction.x, yDirection, direction.z);

    return speed * finalDirection.normalized;
}
```
For the y direction we just need to calculate the ratio of y motion vs the combined x and z motion. Since we normalised direction earlier the combined x and z is just 1 so we can just use tan of the angle to calculate y. We can then normal the vector to get the new direction and multiple by speed.

And now we should have a trajectory and a projectile that follows it.




<a href="https://twitter.com/share" class="twitter-share-button" data-via="JamesFrowenDev">Tweet</a> <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>

