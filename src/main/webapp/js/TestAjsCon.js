var app = angular.module('testAJ',["ngRoute"]);

app.config(function($routeProvider){
    $routeProvider
        .when("",{
            templateUrl: "productos.jsp"
        })
        .when("/",{
            templateUrl: "productos.jsp"
        })
        .when("/employ",{
            templateUrl: "employes.jsp"
        })
        .when("/product",{
            templateUrl :"productos.jsp"
        })
        .when("/category",{
            templateUrl:"categorias.jsp"
        });

})

//Controller categoria
app.controller("getCategorias", ['$scope', '$http', function ($scope, $http) {
    $scope.goRegister = true;

    $http.get("http://localhost:8080/basic-struts/findAllCat") //http://localhost:8080/basic-struts/  ${pageContext.request.contextPath}
        .then(function(response) {
            $scope.category = response.data;
            console.log(response.data);
        }, function(response) {
            console.log("error message: " + response.statusText);
        });

    $scope.getDataFromServer = function() {
        $http.get("http://localhost:8080/basic-struts/findAllCat") //http://localhost:8080/basic-struts/  ${pageContext.request.contextPath}
            .then(function(response) {
                $scope.category = response.data;
                console.log(response.data);
            }, function(response) {
                console.log("error message: " + response.statusText);
            });
    };

    /*Registrar Empleado , ademas mostrando alerta*/
    $scope.registerCat = () => {
        Swal.fire({
            title: '¿Quieres registrar la categoría?',
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            icon: 'question'
        }).then((result) => {
            console.log($scope.category)
            if (result.isConfirmed) {
                $http({
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    url: 'http://localhost:8080/basic-struts/registerCat',
                    data: "params=" + JSON.stringify($scope.category),
                }).then(function successCallback(response) {
                    console.log(response.data);
                    $scope.errorDescription = false;
                    $scope.errorName = false;
                    Swal.fire({
                        icon: 'success',
                        title: '¡Categoría registrada!',
                        showConfirmButton: false,
                        timer: 1000
                    })
                    $scope.getDataFromServer();
                     var myModal = new bootstrap.Modal(document.getElementById('reg'),{
                         keyboard: false
                     })
                     myModal.hide()


                }, function errorCallback(response) {
                    console.log("Error al guardar");
                });
            }else if(result.dismiss === Swal.DismissReason.cancel){
                Swal.fire(
                    'Cancelado',
                    'Categoría no registrada',
                    'error'
                )
            }
        })

    }

    //Modificar empleado
    $scope.modifyCat = () => {
        Swal.fire({
            title: '¿Quieres modificar la categoría?',
            showCancelButton: true,
            confirmButtonText: 'Modificar',
            cancelButtonText: 'Cancelar',
            icon: 'question'
        }).then((result) => {
            if (result.isConfirmed) {
                let categoryModify = new Object();
                categoryModify.id = $scope.id
                categoryModify.name = $scope.name
                categoryModify.description = $scope.description

                $http({
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    url: 'http://localhost:8080/basic-struts/updateCat',
                    data: "params=" + JSON.stringify(categoryModify),
                }).then(function successCallback(response) {
                     $scope.errorDescription = false;
                     $scope.errorName = false;
                    $scope.category = {}
                    $scope.goModify = true;
                    Swal.fire({
                        icon: 'success',
                        title: '¡Se modifico la categoría!',
                        showConfirmButton: false,
                        timer: 1000,
                    })
                    $scope.getDataFromServer();
                }, function errorCallback(response) {
                });
            }else if(result.dismiss === Swal.DismissReason.cancel){
                Swal.fire(
                    'Cancelado',
                    'Datos no actualizados',
                    'error'
                )
            }
        })

    }


    $scope.getCategory = (id) => {
        for (let i = 0; i < $scope.category.categorylist.length; i++) { //Se recorre el array de empleados
            if ($scope.category.categorylist[i].id == id) { //se valida si se encuentra le mismo id
                console.log($scope.category.categorylist[i]) //se muestra el objeto
                $scope.id = $scope.category.categorylist[i].id //se asigna al atributo id, name y email , el valor obtenido
                $scope.name = $scope.category.categorylist[i].name
                $scope.description = $scope.category.categorylist[i].description

                var myModal = new bootstrap.Modal(document.getElementById('modify'), {
                    keyboard: false
                })
                var modalToggle = document.getElementById('modify')
                myModal.show(modalToggle) //Al realizar la validacion se muestra el modal
            }
        }
    }

    $scope.deleteCategory = (id) => {
        let categoryDelete = new Object(); //Se crea objeto para almancenar el id
        categoryDelete.id = id //se crea el atributo id en el objeto y se le asigna el id
        Swal.fire({
            title: '¿Quieres eliminar la categoría?',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
            icon: 'question',
            html: true
        }).then((result) => {
            if (result.isConfirmed) {
                $http({
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    url: 'http://localhost:8080/basic-struts/deleteCat',
                    data: "params=" + JSON.stringify(categoryDelete),
                }).then(function successCallback(response) {
                    $scope.errorDescription = false;
                    $scope.errorName = false;
                    $scope.product = {}
                    Swal.fire({
                        icon: 'success',
                        title: '¡Se elimino la categoría!',
                        showConfirmButton: false,
                        timer: 1000,
                        html: true
                    })
                    $scope.getDataFromServer();
                }, function errorCallback(response) {
                    console.log("Error al eliminar");
                });
            }else if(result.dismiss === Swal.DismissReason.cancel){
                Swal.fire(
                    'Cancelado',
                    'Categoría mantenida :)',
                    'error'
                )
            }
        })

    }

    //Validar el ingreso de datos en el registro
    $scope.validateCat = () => {
        if ($scope.category.name == undefined || $scope.category.name === "") {
            $scope.errorName = true;
            $scope.goRegister = false;
        } else {
            $scope.errorName = false;
        }
        if ($scope.category.description == undefined || $scope.category.description === "") {
            $scope.errorEmail = true;
            $scope.goRegister = false;
        } else {
            $scope.errorEmail = false;
        }


        if (!($scope.category.name == undefined || $scope.category.name === "" ||
            $scope.category.description == undefined || $scope.category.description === "" )) {
            $scope.goRegister = false;
        }else{
            $scope.goRegister = true
        }
    }

    $scope.validateUpdateCat = () => {
        if ($scope.name == undefined || $scope.name === "") {
            $scope.errorName = true;
            $scope.goRegister = false;
        } else {
            $scope.errorName = false;
        }
        if ($scope.description == undefined || $scope.description === "") {
            $scope.errorDescription = true;
            $scope.goRegister = false;
        } else {
            $scope.errorDescription = false;
        }

        if (!($scope.name == undefined || $scope.name === "" ||
            $scope.description == undefined || $scope.description === "" )) {
            $scope.goModify = false; //Variable que permite activar o desactivar el boton modificar,
                        //dependiendo si todos los campos estan completamente requisitados
        }else{
            $scope.goModify = true
        }
    }


}]);

//Controller productos
app.controller("getProductos", ['$scope', '$http', function ($scope, $http) {
    $scope.goRegister = true;
    $http.get("http://localhost:8080/basic-struts/findAllProd") //http://localhost:8080/basic-struts/  ${pageContext.request.contextPath}
        .then(function(response) {
            $scope.product = response.data;
            console.log(response.data);
        }, function(response) {
            console.log("error message: " + response.statusText);
        });
    $http.get("http://localhost:8080/basic-struts/findAllCat") //http://localhost:8080/basic-struts/  ${pageContext.request.contextPath}
        .then(function(response) {
            $scope.dataCategory = response.data;
            console.log("Hola desde de obtener categorias")
            console.log(response.data);
        }, function(response) {
            console.log("error message: " + response.statusText);
        });

    $scope.getDataFromServer = function() {
        $http.get("http://localhost:8080/basic-struts/findAllProd") //http://localhost:8080/basic-struts/  ${pageContext.request.contextPath}
            .then(function(response) {
                $scope.product = response.data;
                console.log(response.data);
            }, function(response) {
                console.log("error message: " + response.statusText);
            });
    };

    /*Registrar Empleado , ademas mostrando alerta*/
    $scope.registerProd = () => {
        Swal.fire({
            title: '¿Quieres registrar el producto?',
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            icon: 'question',
        }).then((result) => {
            console.log("Registrar producto")
            console.log($scope.product)
            if (result.isConfirmed) {
                $http({
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    url: 'http://localhost:8080/basic-struts/registerProd',
                    data: "params=" + JSON.stringify($scope.product),
                }).then(function successCallback(response) {
                    console.log(response.data);
                    $scope.errorDescription = false;
                    $scope.errorName = false;
                    $scope.errorPrice = false;
                    $scope.errorWeight = false;
                    $scope.errorImage = false;
                    $scope.errorCategory = false;
                    Swal.fire({
                        icon: 'success',
                        title: '¡Producto registrado!',
                        showConfirmButton: false,
                        timer: 1000
                    })
                    $scope.getDataFromServer();
                    var myModal = new bootstrap.Modal(document.getElementById('reg'),{
                        keyboard: false
                    })
                    myModal.hide()
                }, function errorCallback(response) {
                    console.log("Error al guardar");
                });
            }else if(result.dismiss === Swal.DismissReason.cancel){
                Swal.fire(
                    'Cancelado',
                    'Producto no registro',
                    'error'
                )
            }
        })

    }

    //Modificar producto

    $scope.modifyProd = () => {
        Swal.fire({
            title: '¿Quieres modificar el producto?',
            showCancelButton: true,
            confirmButtonText: 'Modificar',
            cancelButtonText: 'Cancelar',
            icon: 'question',
        }).then((result) => {
            if (result.isConfirmed) {
                 console.log("Crando el objeto para modificar")

                let productModify = new Object();
                productModify.id =  $scope.id
                productModify.name = $scope.name
                productModify.description = $scope.description
                productModify.price = $scope.price
                productModify.weight = $scope.weight
                console.log("Mostrando el id de categoría")
                productModify.category_id.id = $scope.category_id.id
                console.log(productModify.category_id)
                productModify.image =$scope.image
                console.log(JSON.stringify(productModify))
                $http({
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    url: 'http://localhost:8080/basic-struts/updateProd',
                    data: "params=" + JSON.stringify(productModify),
                }).then(function successCallback(response) {
                    console.log(response.data)
                    $scope.errorDescription = false;
                    $scope.errorName = false;
                    $scope.errorPrice = false;
                    $scope.errorWeight = false;
                    $scope.errorCategory = false;
                    $scope.errorImage = false;
                    $scope.product = {}
                    $scope.goModify = true;
                    Swal.fire({
                        icon: 'success',
                        title: '¡Se modifico el producto!',
                        showConfirmButton: false,
                        timer: 1000
                    })
                    $scope.getDataFromServer();
                }, function errorCallback(response) {
                    console.log(response)
                });
            }else if(result.dismiss === Swal.DismissReasib.cancel){
                Swal.fire(
                    "Cancelado",
                    'Datos no actualizados',
                    'error'
                )
            }
        })

    }


    $scope.getProduct = (id) => {
        for (let i = 0; i < $scope.product.productlist.length; i++) { //Se recorre el array de empleados
            if ($scope.product.productlist[i].id == id) { //se valida si se encuentra le mismo id
                console.log($scope.product.productlist[i]) //se muestra el objeto
                $scope.id = $scope.product.productlist[i].id //se asigna al atributo id, name y email , el valor obtenido
                $scope.name = $scope.product.productlist[i].name
                $scope.description = $scope.product.productlist[i].description
                $scope.price = $scope.product.productlist[i].price
                $scope.weight = $scope.product.productlist[i].weight
                $scope.category_id = $scope.product.productlist[i].category_id.id
                $scope.image = $scope.product.productlist[i].image
                console.log("Se obtuve el producto");
                var myModal = new bootstrap.Modal(document.getElementById('modify'), {
                    keyboard: false
                })
                var modalToggle = document.getElementById('modify')
                myModal.show(modalToggle) //Al realizar la validacion se muestra el modal
            }
        }
    }

    $scope.deleteProduct = (id) => {
        let productDelete = new Object(); //Se crea objeto para almancenar el id
        productDelete.id = id //se crea el atributo id en el objeto y se le asigna el id
        Swal.fire({
            title: '¿Quieres eliminar el producto?',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
            icon: 'question'
        }).then((result) => {
            if (result.isConfirmed) {
                $http({
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    url: 'http://localhost:8080/basic-struts/deleteProd',
                    data: "params=" + JSON.stringify(productDelete),
                }).then(function successCallback(response) {
                    $scope.errorDescription = false;
                    $scope.errorName = false;
                    $scope.errorPrice = false;
                    $scope.errorWeight = false;
                    $scope.errorImage = false;
                    $scope.errorCategory = false;
                    $scope.product = {}
                    Swal.fire({
                        icon: 'success',
                        title: '¡Se elimino el producto!',
                        showConfirmButton: false,
                        timer: 1000
                    })
                    $scope.getDataFromServer();
                }, function errorCallback(response) {
                    console.log("Error al eliminar");
                });
            }else if(result.dismiss == Swal.DismissReason.cancel){
                Swal.fire(
                    'Cancelado',
                    'Producto mantenido :)',
                    'error'
                )
            }
        })

    }

    //Validar el ingreso de datos en el registro
    $scope.validatenameprod = () =>{
        if ($scope.product.name == undefined || $scope.product.name === "") {
            $scope.errorName = true;
            $scope.goRegister = false;
        } else {
            $scope.errorName = false;
        }
        validateReg()
    }

    $scope.validatedescriptionprod = () =>{
        if ($scope.product.description == undefined || $scope.product.description === "") {
            $scope.errorDescription = true;
            $scope.goRegister = false;
        } else {
            $scope.errorDescription = false;
        }
        validateReg()
    }

    $scope.validatepriceprod = () =>{
        if ($scope.product.price == undefined || $scope.product.price === null) {
            $scope.errorPrice = true;
            $scope.goRegister = false;
        } else {
            $scope.errorPrice = false;
        }
        validateReg()
    }

    $scope.validateweightprod = () =>{
        if ($scope.product.weight == undefined || $scope.product.weight === null) {
            $scope.errorWeight = true;
            $scope.goRegister = false;
        } else {
            $scope.errorCategory = false;
        }
        validateReg()
    }

    $scope.validatecategoryprod = () =>{
        if ($scope.product.category_id.id == undefined || $scope.product.category_id.id === null ) {
            $scope.errorCategory = true;
            $scope.goRegister = false;
        } else {
            $scope.errorCategory = false;
        }
        validateReg()
    }
    $scope.validateimageprod = () => {
        if ($scope.product.image == undefined || $scope.product.image === "") {
            $scope.errorImage = true;
            $scope.goRegister = false;
        } else {
            $scope.errorImage = false;
        }
        validateReg()
    }

    let validateReg = () =>{
        if (!($scope.product.name == undefined || $scope.product.name === "" ||
            $scope.product.description == undefined || $scope.product.description === "" ||
            $scope.product.price == undefined || $scope.product.price === null ||
            $scope.product.weight == undefined || $scope.product.weight === null ||
            $scope.product.category_id == undefined || $scope.product.category === null ||
            $scope.product.image == undefined || $scope.product.image === "")) {
            $scope.goRegister = false;
        }else{
            $scope.goRegister = true
        }
    }
    $scope.validatenameprodUp = () =>{

        if (!($scope.product.name == undefined || $scope.product.name === "")) {
            $scope.errorName = true
            $scope.goModify = false;
        }else{
            $scope.errorName = false
        }
        validateUp()
    }

    $scope.validatedescriptionprodUp = () =>{
        if ($scope.description == undefined || $scope.description === "") {
            $scope.errorDescription = true;
            $scope.goModify = false;
        } else {
            $scope.errorDescription = false;
        }
        validateUp()
    }

    $scope.validatepriceprodUp = () =>{
        if ($scope.price == undefined || $scope.price === null) {
            $scope.errorPrice = true;
            $scope.goModify = false;
        } else {
            $scope.errorPrice = false;
        }
        validateUp()
    }

    $scope.validateweightprodUp = () =>{
        if ($scope.weight == undefined || $scope.weight === null) {
            $scope.errorWeight = true;
            $scope.goModify = false;
        } else {
            $scope.errorCategory = false;
        }
        validateUp()
    }

    $scope.validatecategoryprodUp = () =>{
        if ($scope.category_id == undefined || $scope.category_id === null ) {
            $scope.errorWeight = true;
            $scope.goModify = false;
        } else {
            $scope.errorWeight = false;
        }
        validateUp()
    }
    $scope.validateimageprodUp = () => {

        if ($scope.image == undefined || $scope.image === "") {
            $scope.errorImage = true;
            $scope.goModify = false;
        } else {
            $scope.errorImage = false;
        }
        validateUp()
    }

  let validateUp = () =>{
      if (!($scope.name == undefined || $scope.name === "" ||
          $scope.description == undefined || $scope.description === "" ||
          $scope.price == undefined || $scope.price === "" ||
          $scope.weight == undefined || $scope.weight === "" ||
          $scope.category_id == undefined || $scope.category_id === null ||
          $scope.image == undefined || $scope.image === "")) {
          $scope.goModify = false;
      }else{
          $scope.goModify = true
      }
  }

}]);


//Controller Empleados
app.controller("getEmpleados", ['$scope', '$http', function ($scope, $http) {
    $scope.goRegister = true;

    $http.get("http://localhost:8080/basic-struts/findAll") //http://localhost:8080/basic-struts/  ${pageContext.request.contextPath}
        .then(function(response) {
            $scope.person = response.data;
            console.log(response.data);
        }, function(response) {
            console.log("error message: " + response.statusText);
        });

    $scope.getDataFromServer = function() {
        $http.get("http://localhost:8080/basic-struts/findAll") //http://localhost:8080/basic-struts/  ${pageContext.request.contextPath}
            .then(function(response) {
                $scope.person = response.data;
                console.log(response.data);
            }, function(response) {
                console.log("error message: " + response.statusText);
            });
    };

    /*Registrar Empleado , ademas mostrando alerta*/
    $scope.register = () => {
        Swal.fire({
            title: '¿Quieres registrar el empleado?',
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            icon: 'question',
        }).then((result) => {
            console.log($scope.person)
            if (result.isConfirmed) {
                $http({
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    url: 'http://localhost:8080/basic-struts/register',
                    data: "params=" + JSON.stringify($scope.person),
                }).then(function successCallback(response) {
                    console.log(response.data);
                    $scope.errorEmail = false;
                    $scope.errorName = false;
                    Swal.fire({
                        icon: 'success',
                        title: '¡Empleado registrado!',
                        showConfirmButton: false,
                        timer: 1000
                    })
                    $scope.getDataFromServer();
                    var myModal = new bootstrap.Modal(document.getElementById('reg'),{
                        keyboard: false
                    })
                    myModal.hide()
                }, function errorCallback(response) {
                    console.log("Error al guardar");
                });
            }else if(result.dismiss === Swal.DismissReason.cancek){
                Swal.fire(
                    'Cancelado',
                    'Empleado no registrado',
                    'error'
                )
            }
        })

    }

    //Modificar empleado
    $scope.modifyEmploy = () => {
        Swal.fire({
            title: '¿Quieres modificar al empleado?',
            showCancelButton: true,
            confirmButtonText: 'Modificar',
            cancelButtonText: 'Cancelar',
            icon: 'question',
        }).then((result) => {
            if (result.isConfirmed) {
                let employModify = new Object();
                employModify.id = $scope.id
                employModify.name = $scope.name
                employModify.email = $scope.email
                $http({
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    url: 'http://localhost:8080/basic-struts/update',
                    data: "params=" + JSON.stringify(employModify),
                }).then(function successCallback(response) {
                    $scope.errorEmail = false;
                    $scope.errorName = false;
                    $scope.product = {}
                    $scope.goModify = true;
                    Swal.fire({
                        icon: 'success',
                        title: '¡Se modifico el empleado!',
                        showConfirmButton: false,
                        timer: 1000,
                    })
                    $scope.getDataFromServer();
                }, function errorCallback(response) {
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelado',
                    'Datos no actualizados',
                    'error'
                )
            }
        })
    }


    $scope.getEmploy = (id) => {
        for (let i = 0; i < $scope.person.employelist.length; i++) { //Se recorre el array de empleados
            if ($scope.person.employelist[i].id == id) { //se valida si se encuentra le mismo id
                console.log($scope.person.employelist[i]) //se muestra el objeto
                $scope.id = $scope.person.employelist[i].id //se asigna al atributo id, name y email , el valor obtenido
                $scope.name = $scope.person.employelist[i].name
                $scope.email = $scope.person.employelist[i].email

                var myModal = new bootstrap.Modal(document.getElementById('modify'), {
                    keyboard: false
                })
                var modalToggle = document.getElementById('modify')
                myModal.show(modalToggle) //Al realizar la validacion se muestra el modal
            }
        }
    }

    $scope.delete = (id) => {
        let employDelete = new Object(); //Se crea objeto para almancenar el id
        employDelete.id = id //se crea el atributo id en el objeto y se le asigna el id
        Swal.fire({
            title: '¿Quieres eliminar al empleado?',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
            icon: 'question'
        }).then((result) => {
            if (result.isConfirmed) {
                $http({
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    url: 'http://localhost:8080/basic-struts/delete',
                    data: "params=" + JSON.stringify(employDelete),
                }).then(function successCallback(response) {
                    $scope.errorEmail = false;
                    $scope.errorName = false;
                    $scope.product = {}
                    Swal.fire({
                        icon: 'success',
                        title: '¡Se elimino el empleado!',
                        showConfirmButton: false,
                        timer: 1000
                    })
                    $scope.getDataFromServer();
                }, function errorCallback(response) {
                    console.log("Error al eliminar");
                });
            }else if(
                result.dismiss == Swal.DismissReason.cancel){
                Swal.fire(
                    'Cancelado',
                    'Aun estra registrado :)',
                    'error'
                )
            }
        })

    }

    //Validar el ingreso de datos en el registro
    $scope.validate = () => {
        if ($scope.person.name == undefined || $scope.person.name === "") {
            $scope.errorName = true;
            $scope.goRegister = false;
        } else {
            $scope.errorName = false;
        }
        if ($scope.person.email == undefined || $scope.person.email === "") {
            $scope.errorEmail = true;
            $scope.goRegister = false;
        } else {
            $scope.errorEmail = false;
        }

        if (!($scope.person.name == undefined || $scope.person.name === "" ||
            $scope.person.email == undefined || $scope.person.email === "" )) {
            $scope.goRegister = false;
        }else{
            $scope.goRegister = true
        }
    }

    $scope.validateUpdate = () => {
        if ($scope.name == undefined || $scope.name === "") {
            $scope.errorName = true;
            $scope.goModify = false;
        } else {
            $scope.errorName = false;
        }
        if ($scope.email == undefined || $scope.email === "") {
        $scope.errorEmail =true
            $scope.goModify = false
        }else{
        $scope.errorEmail = false
        }
        if (!($scope.name == undefined || $scope.name === "" ||
            $scope.email == undefined || $scope.email === "" )) {
            $scope.goModify = false;
        }else{
            $scope.goModify = true
        }
    }

}])