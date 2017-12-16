---
layout: post
title: change-log-v0-1-18.md
description: 
image: /assets/images/.jpg
project: Quantum Robot
date: 2017-12-04
draft: true
published: true
show_itchio_download: true
---

I am changing the way I am doing version for Quantum robot. The old system I was releasing stable builds slightly more than once a week. I am not very happy that I am delaying small changes that seem important in order to have more to write in a change log.

The new system I am planning to use mean I will push a new "indev" version regularly. This build will likely be less stable and will only be the windows version to keep build time low. I will still be planning to releases the stable version weekly with a change log.

With this change i will be moving the game version to v0-1-x to act as a kind of reset for the version numbers and to make it easier to distinguish between the old and new system.

### Changes

* Changing how taser works
    * Taser now has heat instead of an ammo clip
    * Player gets stunned when the taser reaches 100%
    * Shoots 30 projectiles
    * Each projectiles deals damage and increase stun duration.
* New Textures
    * Grenade
    * Repair kit
    * Taser
* Grenades now glow before they explode
* New Sound Effects
    * Taser shot
    * Slime attack
    * Slime death
    * Slime taking damage
    * Door open and close
    * Spiker activate
    * Spiker passive
* Adding recoil animation to weapons
* Adding reload animation to weapons
* Adding animation for changing weapons
* Adding sounds and lights when the door to the boss opens
* Adding links to the bottom right of the main menu
* Adding current version to the button left of the main menu
* Adding music for the game
    * The music is current from the asset store and can be found here, [Sci-fi Industrial Obscurity](https://assetstore.unity.com/packages/audio/music/electronic/sci-fi-industrial-obscurity-7752)
* Adding ambient sounds around the map
* Adding volume settings for each type of sounds

### Bug Fixes

* Fixed weapon ui bug when changing weapon while reloading

