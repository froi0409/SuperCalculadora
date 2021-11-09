var username = document.getElementById("username");
var password = document.getElementById("password");

function login(){
	try{
		$.ajax({
			type: 'GET',
            async:true, 
            dataType : 'json',
			//dataType: "json",
			url: 'http://localhost:5000/api/login', 
			crossDomain:true,
			data: {username: username.value, password: password.value},
			success: function(data){
				console.log("datos: " + data.estado);

				const resultado = data.estado;
				if(data.estado === "true"){
					// Simulate an HTTP redirect:
					window.location.replace("http://localhost:5000/");
				}			
			}
		});
	}catch(error){
		console.log("Error en la conexion: " + error);
	}	
}

function registrar(){
	try{
		$.ajax({
			type: 'GET', 
            /*async:true, */
            dataType : 'json',
			//dataType: "json",
			url: 'http://localhost:5000/api/registrar', 
			data: {username: username.value, password: password.value},
			success: function(data){
				console.log("datos: " + data.estado);
				const resultado = data.estado;
				if(data.estado === "Se registro"){
					// Simulate an HTTP redirect:
					window.location.replace("http://localhost:5000/");
				}			
			}
		});
	}catch(error){
		console.log("Error en la conexion: " + error);
	}	
}



