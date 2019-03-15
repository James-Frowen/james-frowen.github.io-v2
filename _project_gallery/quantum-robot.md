---
layout: project_gallery
title: Quantum Robot Gallery
description: Some images
project_name: quantum-robot
---


<style>
  /* Style the Image Used to Trigger the Modal */
  #myImg {
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;
  }

  #myImg:hover {
    opacity: 0.7;
  }

  /* The Modal (background) */
  .modal {
    display: none;
    /* Hidden by default */
    position: fixed;
    /* Stay in place */
    z-index: 1;
    /* Location of the box */
    left: 0;
    top: 0;
    width: 100%;
    /* Full width */
    height: 100%;
    /* Full height */
    overflow: auto;
    /* Enable scroll if needed */
    background-color: rgb(0, 0, 0);
    /* Fallback color */
    background-color: rgba(0, 0, 0, 0.9);
    /* Black w/ opacity */
  }

  /* Modal Content (Image) */
  .modal-content {
    margin: auto;
    display: block;
    width: 80%;
    max-width: 700px;
  }

  /* Caption of Modal Image (Image Text) - Same Width as the Image */
  #caption {
    margin: auto;
    display: block;
    width: 80%;
    max-width: 700px;
    text-align: center;
    color: #ccc;
    padding: 10px 0;
    height: 150px;
  }

  /* Add Animation - Zoom in the Modal */
  .modal-content,
  #caption {
    animation-name: zoom;
    animation-duration: 0.6s;
  }

  @keyframes zoom {
    from {
      transform: scale(0)
    }

    to {
      transform: scale(1)
    }
  }

  /* The Close Button */
  .close {
    top: 15px;
    right: 35px;
  }

  .nextImg {
    top: 50%;
    right: 35px;
    transform: translateY(-50%)
  }

  .previousImg {
    top: 50%;
    left: 35px;
    transform: translateY(-50%)
  }

  .modelButton {
    position: absolute;
    color: #f1f1f1;
    font-size: 40px;
    font-weight: bold;
    transition: 0.3s;
  }

  .modelButton:hover,
  .modelButton:focus {
    color: #bbb;
    text-decoration: none;
    cursor: pointer;
  }

  /* 100% Image Width on Smaller Screens */
  @media only screen and (max-width: 700px) {
    .modal-content {
      width: 100%;
    }
  }
</style>
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
<div id="myModal" class="modal">

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