<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<html lang="en">
<head>
    <meta http-equiv=”Content-Type” content=”text/html; charset=UTF-8″ />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>CRUD AJS/STRUTS2</title>
    <link rel="stylesheet" href="css/styles.css"/>
    <link rel="stylesheet" href="libraries/font-Awesome-6.x/css/all.css"/>
    <link rel="stylesheet" href="libraries/bootstrap-5.2.0/css/bootstrap.min.css"/>
    <script src="libraries/angular-1.8.2/angular.min.js"></script>
    <script src="libraries/angular-1.8.2/angular-route.js"></script>
    <script src="libraries/sweetalert2/sweetalert2.all.min.js"></script>

</head>
<body ng-app="testAJ" style="background-color: #cfd8dc;"> <!--ng-app denota que sera un app de angular  -->
<!-- style="background-color: #455a64; color: #455a64;"-->
<header>
    <nav class="navbar navbar-dark navbar-expand-lg sticky-top bg-dark" style="background: #1D1D1D;">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">CRUD Empleados</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <a class="nav-link active" aria-current="page" href="#!/employ">Empleados</a>
                    <a class="nav-link active" aria-current="page" href="#!/product">Productos</a>
                    <a class="nav-link active" aria-current="page" href="#!/category">Categorías</a>
                </div>
            </div>
        </div>
    </nav>
</header>

<main style="background: #121212;">
<div ng-view ></div>
</main>
<script src="libraries/bootstrap-5.2.0/js/bootstrap.bundle.js"></script>
<script src="js/TestAjsCon.js" charset="UTF-8"></script>
<script src="js/TestAjsCon.js"></script>
</body>
</html>