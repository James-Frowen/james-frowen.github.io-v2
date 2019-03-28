---
layout: unity_tip
title: IMonoBehaviour
description: Interface with most properties of Unity's MonoBehaviour class
image: /assets/images/mono-behaviour-interface.jpg
date: 2019-03-22
---

Allows other interfaces to inherit properties and functions of the MonoBehaviour class.
Useful when you have an interface you know will be implemented by a MonoBehaviour class.

<img src="{{ ' /assets/images/mono-behaviour-interface.jpg' | relative_url }}" class="img-responsive rounded-image full-shadow" width="100%" alt="Images of SerializedEditorWindow script"> 

{% include gist.html 
    id = 'e4db3c0a281412ace6ca1c6462113bf0'
    collapsible = true
%}