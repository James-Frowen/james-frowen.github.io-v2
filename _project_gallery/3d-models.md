---
layout: project_gallery
title: 3d Models
description: Some images
project_url: 3d-models
---

<!-- Page Content -->
<div class="container">

  <h1 class="font-weight-light text-center text-lg-left mt-4 mb-0">Thumbnail Gallery</h1>

  <hr class="mt-2 mb-5">

  <div class="row text-center text-lg-left">

    <div class="col-lg-3 col-md-4 col-6">
      <img class="modal-trigger img-fluid img-thumbnail sketchfab-model" sketchfabid = "479cd6112b9c4bd3ac1083aef6d06291" src="{{ '/assets/images/3d-lamp.jpg' | relative_url }}" alt="lamp">
    </div>
    <div class="col-lg-3 col-md-4 col-6">
        <img class="modal-trigger img-fluid img-thumbnail" src="https://source.unsplash.com/aob0ukAYfuI" alt="">
    </div>
    <div class="col-lg-3 col-md-4 col-6">
        <img class="modal-trigger img-fluid img-thumbnail" src="https://source.unsplash.com/EUfxH-pze7s" alt="">
    </div>
    <div class="col-lg-3 col-md-4 col-6">
      
        <img class="modal-trigger img-fluid img-thumbnail" src="https://source.unsplash.com/M185_qYH8vg" alt="">
      
    </div>
    <div class="col-lg-3 col-md-4 col-6">
      
        <img class="modal-trigger img-fluid img-thumbnail" src="https://source.unsplash.com/sesveuG_rNo" alt="">
      
    </div>
    <div class="col-lg-3 col-md-4 col-6">
      
        <img class="modal-trigger img-fluid img-thumbnail" src="https://source.unsplash.com/AvhMzHwiE_0" alt="">
      
    </div>
    <div class="col-lg-3 col-md-4 col-6">
      
        <img class="modal-trigger img-fluid img-thumbnail" src="https://source.unsplash.com/2gYsZUmockw" alt="">
      
    </div>
    <div class="col-lg-3 col-md-4 col-6">
      
        <img class="modal-trigger img-fluid img-thumbnail" src="https://source.unsplash.com/EMSDtjVHdQ8" alt="">
      
    </div>
    <div class="col-lg-3 col-md-4 col-6">
      
        <img class="modal-trigger img-fluid img-thumbnail" src="https://source.unsplash.com/8mUEy0ABdNE" alt="">
      
    </div>
    <div class="col-lg-3 col-md-4 col-6">
      
        <img class="modal-trigger img-fluid img-thumbnail" src="https://source.unsplash.com/G9Rfc1qccH4" alt="">
      
    </div>
    <div class="col-lg-3 col-md-4 col-6">
      
        <!-- <img class="modal-trigger img-fluid img-thumbnail" src="https://source.unsplash.com/aJeH0KcFkuc" alt=""> -->
        <img class="modal-trigger img-fluid img-thumbnail" src="https://via.placeholder.com/400x300" alt="">
      
    </div>
    <div class="col-lg-3 col-md-4 col-6">
      
        <!-- <img class="modal-trigger img-fluid img-thumbnail" src="https://source.unsplash.com/p2TQ-3Bh3Oo" alt=""> -->
        <img class="modal-trigger img-fluid img-thumbnail" src="https://via.placeholder.com/500x600" alt="">
      
    </div>
  </div>
</div>
<!-- /.container -->


<!-- The Modal -->
<div id="galleryModal" class="modal">

  <!-- The Close Button -->
  <span class="close modelButton">&times;</span>

  <!-- The Close Button -->
  <span class="nextImg modelButton">&gt;</span>

  <!-- The Close Button -->
  <span class="previousImg modelButton">&lt;</span>

  <div class="modal-inner">
  <div class="top"></div>

  <!-- Modal Content (The Image) -->
  <div class="modal-content mid vertical-center-children">
    <img id="modal-image">
    <div class="sketchfab-embed-wrapper" id="sketch-wrapper"></div>
  </div>

  <!-- Modal Caption (Image Text) -->
  <div id="caption" class="bot"></div>
  </div>
</div>

<script src="{{ '/assets/scripts/ImageModal.js?v='  | append: site.github.build_revision | relative_url  }}"></script>


