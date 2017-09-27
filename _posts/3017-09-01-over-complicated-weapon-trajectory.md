---
layout: post
title: How to fix lighting for unity cloud build
date: 2017-09-01
published: true
draft: true
---

blog post about weapon trajectory

Firstly i want to start off by saying this post will include a lot of maths and code.

My goal was to get the trajectory of a grenade to start from the weapon and land at a point in front of the player's head/camera. The problem with this is that the weapon is offset in all 3 dimensions so things get complicated fast. Another minor problem was getting the trajectory path shown to the player line up with the projectile once it was launched.

To display the trajectory you can used a simple `LineRenderer`, and to make the projectile move you can apply motion to a `Rigidbody`.

To get the trajectory started you can simply think of it in 2 dimensions, height, and distance. Starting with values for speed and angle of launch I could can use the [trajectory formulas](https://en.wikipedia.org/wiki/Trajectory).

I decided that the start of the trajectory path was more important so i made the thickness of the `LineRenderer` decrease over its path. By doing this i dont have to worry about if the projectile is going to land below the height it started at because the line would be near unseeable by that point anyway.

The path the takes follows this equation of motion:

```
y = x*tan(a) - (x^2 * g) / (2 * s^2 + cos^2(a))
```
`y` = height
`x` = distance
`s^2` = speed squared
`a` = launch angle
`g` = acceleration due to gravity

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
D = (s^2 * sin(2a))/g
```
`D` = Distance
`s^2` = speed squared
`a` = launch angle
`g` = acceleration due to gravity

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

float TrajectoryDistance(float speed, float angle, float gravity, float initialHeight = 0f)
{
    float xSpeed = Mathf.Cos(angle) * speed; 
    float ySpeed = Mathf.Sin(angle) * speed;
    return (xSpeed / gravity) * (ySpeed + Mathf.Sqrt(ySpeed * ySpeed + 2f * gravity * initialHeight));
}
```


A few notes about the position as we convert `x` and `y` to a vector. `y` should be the global up. `x` should be the local forward, this is so that the trajectory is always facing the same direction as our player. Lastly we need to make sure that the trajectory moves with the player.

```csharp
position[i] = (y * Vector3.up) + (x * transform.forward) + transform.position;
```

We should not have a working trajectory from the transform that has this script attached. Now in order to make this work with an offset only requires minor changes.

First we should set up our objects in unity so that this will be easy to do. 
*** Image of player set up ***
