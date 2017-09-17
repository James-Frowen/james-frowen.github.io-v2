---
layout: post
title: How to fix lighting for unity cloud build
date: 2017-09-01
published: false
draft: true
---

blog post about weapon trajectory

Firstly i want to start off by saying this post will include a lot of maths and code.

My goal was to get the trajectroy of the grenade to start from the weapon and land at a point infront of the players head/camera. the problem with this is that the weapon is offset in all 3 axis so things got complicated fast. Another minor problem was getting the trajectory path shown to the player line up with the projectile once it was launched

To get the trajectory started I could simply think of it in 2 dimesions, projectile hieght, and distnace. Starting with values for speed and angle of launch I could can use the [trajectory formulas](https://en.wikipedia.org/wiki/Trajectory).

To display my trajectory i used a simple `LineRenderer`, and to make the projectile move i will use a `rigidbody`

I decided that the start of the trajectory path was more important so i made the thinkness of the `LineRenderer` decrease over its path. By doing this i dont have to worry about if the projectile is going to land below the height it started at because the line would be near unseeable by that point anyway.

The path the takes follows this equation of motion:

```
y = x*tan(a) - (x^2 *g) / (2 s^2 + cos2(a))
```
`y` = height
`x` = distance
`s^2` = speed squared
`a` = launch angle
`g` = acceleration due to gravity

With this equation we can render the path. To do this we need to pick either `x` or `y` and vary them and calculate the other one and plot each point. As you should be able to tell from the equation, we are going to vary `x` and calculate y.

We are going to take values for x at equal distances from 0 to the distance the projectile hits the ground. To get the distance we will use:

```
D = (s^2 * sin(2a))/g
```
`D` = Distance
`s^2` = speed squared
`a` = launch angle
`g` = acceleration due to gravity

Now lets lets put these into code that unity can use:

```
Vector2 calcualteArcPoint(float t, float trajectoryDistnace, float radianAngle, float sqSpeed)
    {
        float x = t * trajectoryDistnace;
        float y = x * Mathf.Tan(radianAngle) - ((this.gravity * x * x) / (2 * sqSpeed * Mathf.Cos(radianAngle) * Mathf.Cos(radianAngle)));

        return new Vector2(x, y);
    }
```

`t` is a number between 0 and 1, and is incremented equal to get a smooth curve. `y` is calculated by using the value we set `x` to and the equalsion above. Make sure that the angle you use it in radians, Unity has a nice constant that can be used to easily do that 

```
float radianAngle = Mathf.Deg2Rad * angle;
```