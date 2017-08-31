---
layout: post
title: How to set up unity cloud build with bitbucket
date: 2017-09-00
published: false
draft: true
---

# Down load git

1 - https://git-scm.com/

# Bitbucket

1 - sign up for bitbucket
2 - create new repo
3 - ...
4 - open command line and cd to dir that you have the repo

5a - git init
5b - https://www.gitignore.io/
5b - create .gitignore
5c - `git add .`
5d - `git commmit -m "intial commit"`
5e -  
```
git remote add origin ssh://git@bitbucket.org/JamesFrowen/rerrr.git
git push -u origin master
```



# unity

1 - file > build settings
2a - add scenes you want to build
2b - click build to make sure it builds locally
2c - create a folder called build in the project root
3 - commit new files files 

# cloud build
1 - https://unity3d.com/
2 - services
3 - cloud build
4 - https://developer.cloud.unity3d.com/support/guides/sourcecontrol/
5 - enter git@bitbucket:user-name/repo-name.git
6 - add key to bitbucket
7 - create production branch
8a - go back to unity select build target
8b - select prodcution branch as target
9 - finish
10 - build should have started, should take round 5 mins

# push new code to the cloud
0 - add, commit and push changes as you go along
once code for a new build is ready,
1 - go to your repo on bitbucket 
2 - go to pull requests
3 - create pull request, master -> prod
4 - click merge
5 - if auto build is on, unity will start the build soon
6 - otherwise to go cloud build and click start new build


# toubleshoot

### no lighting (dim lighting)
fix lighting

### no blender model
use fbx
