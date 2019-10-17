---
layout: project_gallery
title: Quantum Robot Gallery
description: Some images
project_url: quantum-robot
---

<!-- Page Content -->
<div class="container">

  <h1 class="font-weight-light text-center text-lg-left mt-4 mb-0">Thumbnail Gallery</h1>

  <hr class="mt-2 mb-5">

  <div class="row text-center text-lg-left">

    <div class="col-lg-3 col-md-4 col-6">
      <!-- <a href="#/" class="d-block mb-4 h-100"> -->
      <img class="img-fluid img-thumbnail" src="https://source.unsplash.com/pWkk7iiCoDM/400x300" alt="">
      <!-- </a> -->
    </div>
    <div class="col-lg-3 col-md-4 col-6">
      <a href="#/" class="d-block mb-4 h-100">
        <img class="img-fluid img-thumbnail" src="https://source.unsplash.com/aob0ukAYfuI/400x300" alt="">
      </a>
    </div>
    <div class="col-lg-3 col-md-4 col-6">
      <a href="#/" class="d-block mb-4 h-100">
        <img class="img-fluid img-thumbnail" src="https://source.unsplash.com/EUfxH-pze7s/400x300" alt="">
      </a>
    </div>
    <div class="col-lg-3 col-md-4 col-6">
      <a href="#/" class="d-block mb-4 h-100">
        <img class="img-fluid img-thumbnail" src="https://source.unsplash.com/M185_qYH8vg/400x300" alt="">
      </a>
    </div>
    <div class="col-lg-3 col-md-4 col-6">
      <a href="#/" class="d-block mb-4 h-100">
        <img class="img-fluid img-thumbnail" src="https://source.unsplash.com/sesveuG_rNo/400x300" alt="">
      </a>
    </div>
    <div class="col-lg-3 col-md-4 col-6">
      <a href="#/" class="d-block mb-4 h-100">
        <img class="img-fluid img-thumbnail" src="https://source.unsplash.com/AvhMzHwiE_0/400x300" alt="">
      </a>
    </div>
    <div class="col-lg-3 col-md-4 col-6">
      <a href="#/" class="d-block mb-4 h-100">
        <img class="img-fluid img-thumbnail" src="https://source.unsplash.com/2gYsZUmockw/400x300" alt="">
      </a>
    </div>
    <div class="col-lg-3 col-md-4 col-6">
      <a href="#/" class="d-block mb-4 h-100">
        <img class="img-fluid img-thumbnail" src="https://source.unsplash.com/EMSDtjVHdQ8/400x300" alt="">
      </a>
    </div>
    <div class="col-lg-3 col-md-4 col-6">
      <a href="#/" class="d-block mb-4 h-100">
        <img class="img-fluid img-thumbnail" src="https://source.unsplash.com/8mUEy0ABdNE/400x300" alt="">
      </a>
    </div>
    <div class="col-lg-3 col-md-4 col-6">
      <a href="#/" class="d-block mb-4 h-100">
        <img class="img-fluid img-thumbnail" src="https://source.unsplash.com/G9Rfc1qccH4/400x300" alt="">
      </a>
    </div>
    <div class="col-lg-3 col-md-4 col-6">
      <a href="#/" class="d-block mb-4 h-100">
        <!-- <img class="img-fluid img-thumbnail" src="https://source.unsplash.com/aJeH0KcFkuc/400x300" alt=""> -->
        <img class="img-fluid img-thumbnail" src="https://via.placeholder.com/400x300" alt="">
      </a>
    </div>
    <div class="col-lg-3 col-md-4 col-6">
      <a href="#/" class="d-block mb-4 h-100">
        <!-- <img class="img-fluid img-thumbnail" src="https://source.unsplash.com/p2TQ-3Bh3Oo/400x300" alt=""> -->
        <img class="img-fluid img-thumbnail" src="https://via.placeholder.com/500x600" alt="">
      </a>
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

  <!-- Modal Content (The Image) -->
  <img class="modal-content" id="img01">

  <!-- Modal Caption (Image Text) -->
  <div id="caption"></div>
</div>

<script src="{{ '/assets/scripts/ImageModal.js?v='  | append: site.github.build_revision | relative_url  }}"></script>