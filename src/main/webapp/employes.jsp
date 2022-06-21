<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<html lang="en">
<head>
    <meta http-equiv=”Content-Type” content=”text/html; charset=UTF-8″ />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>CRUD AJS/STRUTS2</title>
    <link rel="stylesheet" href="css/style.css"/>
    <link rel="stylesheet" href="libraries/font-Awesome-6.x/css/all.css"/>
    <link rel="stylesheet" href="libraries/bootstrap-5.2.0/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="libraries/sweetalert2/sweetalert2-themes-main/dark/dark.scss"/>
    <script src="libraries/angular-1.8.2/angular.min.js"></script>
    <script src="libraries/sweetalert2/sweetalert2.all.min.js"></script>
</head>
<body ng-app="testAJ" style="background: #121212;"> <!--ng-app denota que sera un app de angular  -->

<main ng-controller="getEmpleados" >
    <h1 class="mt-3 text-center" style="color: #003049;">Empledos</h1>
    <hr style="background-color: white;">
    <div class="container">
        <div class="d-md-flex justify-content-md-end input-group input-group-lg mb-3">
            <input class="form-control" type="search" placeholder="Buscar" ng-model="find" aria-label="Search" aria-describedby="inputGroup-sizing-lg">
            <button class="btn btn-success input-group-text" type="button" id="inputGroup-sizing-lg" data-bs-toggle="modal" data-bs-target="#register"><i
                    class="fas fa-plus"></i></button>
        </div>

        <%--        <div class="d-md-flex justify-content-md-end input-group input-group-lg mb-3">--%>
        <%--            <input class="form-control" type="search" placeholder="Buscar" ng-model="find" aria-label="Search" aria-describedby="inputGroup-sizing-lg">--%>
        <%--            <button class="btn btn-success input-group-text" type="button" id="inputGroup-sizing-lg" data-bs-toggle="modal" data-bs-target="#register"><i--%>
        <%--                    class="fas fa-plus"></i></button>--%>
        <%--        </div>--%>
        <div class="row justify-content-center">
            <form id="reg" method="post" ng-submit="register()">
                <div class="modal fade" id="register" tabindex="-1" aria-labelledby="exampleModalLabel"
                     aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header" style="background-color: #388e3c;">
                                <h5 class="modal-title" style="color: white;">Registrar Empleado</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                            </div>
                            <div class="modal-body" style="background: #1D1D1D;">
                                <div class="container">

                                    <div class="row">
                                        <div class="mb-3">
                                            <label for="InputName" class="form-label">Name</label>
                                            <input type="text" class="form-control" id="InputName" name="person.name"
                                                   ng-model="person.name" aria-describedby="nameHelp" ng-change="validate()" >
<%--                                            <span style="color: #D62828;" ng-show="errorName">Nombre es requerido</span>--%>
                                            <div class="alert alert-danger alert-dismissible fade show" ng-show="errorName" role="alert">
                                                <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                                                <div>
                                                Name is required
                                                </div>
                                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                            </div>
                                        </div>
                                        <div class="mb-3">
                                            <label for="InputEmail" class="form-label">Email</label>
                                            <input type="email" name="person.email" ng-model="person.email"
                                                   class="form-control" id="InputEmail" ng-change="validate()">
<%--                                            <span style="color: #D62828;" ng-show="errorEmail">Correo requerido</span>--%>
                                            <div class="alert alert-danger alert-dismissible fade show" ng-show="errorEmail" role="alert">
                                                <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                                                <div>
                                                Email is required
                                                </div>
                                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar
                                    </button>
                                    <button type="submit" class="btn" style="background-color: #003049;color: white;"
                                            ng-disabled="goRegister">Registrar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            <div class="row text-center justify-content-center">
                <div class="col-12" ng-if="(person.employelist | filter: find) == '' ">
                <span class="badge rounded-pill text-white" style="background-color: #003049; font-size: 18px;">No hay
                    empleados</span>
                </div>
                <div class=" col-lg-3 col-sm-6 g-4" ng-repeat="employ in person.employelist | filter: find">
                    <div class="card h-100"  style="background: #1D1D1D;">
                        <h5 class="card-header text-white">Empleado(a): {{employ.name}}</h5>
                        <div class="card-body">
                            <h5 class="card-title fw-light text-white">Correo: {{employ.email}}</h5>
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-primary" type="button" ng-click="getEmploy(employ.id)">
                                <i class="fas fa-edit"></i></button>
                            <button class="btn btn-danger" type="button" ng-click="delete(employ.id)">
                                <i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                </div>
            </div>

            <form ng-submit="modifyEmploy()" method="post">
                <div class="modal fade" id="modify" tabindex="-1" aria-labelledby="exampleModalLabel"
                     aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header" style="background-color: #1565c0;">
                                <h5 class="modal-title" style="color: white" id="exampleModalLabel">Modificar empleado</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                            </div>
                            <div class="modal-body" style="background: #1D1D1D;">
                                <div class="container">
                                    <div class="row">
                                        <div class="mb-3">

                                            <input ng-model="id" name="id" type="hidden" class="form-control"
                                                   aria-describedby="emailHelp">
                                            <label class="form-label">Nombre</label>
                                            <input ng-change="validateUpdate()" type="text" ng-model="name" name="name"
                                                   class="form-control" aria-describedby="emailHelp">
<%--                                            <span style="color: #D62828;" ng-show="errorName">Nombre es requerido</span>--%>
                                            <div class="alert alert-danger alert-dismissible fade show" ng-show="errorName" role="alert">
                                                <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                                                <div>
                                                Name is required
                                                </div>
                                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                            </div>
                                            <!--                                        <span style="color: #D62828;" ng-show="errorName">El nombre es-->
                                            <!--                                        requerido</span>-->
                                        </div>

                                        <div class="mb-3">
                                            <label class="form-label">Correo Electrónico</label>
                                            <input ng-change="validateUpdate()" type="text" ng-model="email"
                                                   name="email"
                                                   class="form-control" aria-describedby="emailHelp">
<%--                                            <span style="color: #D62828;" ng-show="errorEmail">Correo requerido</span>--%>
                                            <div class="alert alert-danger alert-dismissible fade show" ng-show="errorEmail" role="alert">
                                                <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                                                <div>
                                                Email is required
                                                </div>
                                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="submit" ng-disabled="goModify" class="btn"
                                        style="background-color: #003049;color: white;">Modificar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>

</main>


<!--Iconos svg de bootstrap para alerts-->
<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
    <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
    </symbol>
    <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
    </symbol>
    <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
    </symbol>
</svg>

<script src="libraries/bootstrap-5.2.0/js/bootstrap.bundle.js"></script>
<script src="js/TestAjsCon.js" charset="UTF-8"></script>
</body>
</html>