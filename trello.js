var container = document.getElementById("cardsContainer");
var cardCreator = document.getElementsByClassName("cardCreator")[0];
var theForm = document.getElementsByClassName("over")[0];
var userArray = [];

/*----- DATA -------*/

// Load array of user objects from JSON file
var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', 'users.json');
ourRequest.onload = function(){
	if(ourRequest.status >=200 && ourRequest.status < 400){
		userArray = JSON.parse(ourRequest.responseText);
		init();
	}else{
		alert("We connected to the server but it returned an error");
	}
	
};

ourRequest.onerror = function(){
	alert("Connection error");
}

ourRequest.send();

var lineArray = [
	"M245.75,37.5c0,0-19.5-19.25-40.5-9.84C184.302,37.046,173,65.5,141.703,64.62C112.193,63.79,91.25,51.5,60.5,52.75C32.023,53.907,1.649,80.651,1.649,80.651",
	"M256.316,3.5c0,0-12.066-2.25-27.566,11	c-7.952,6.797-32.101,31.818-58.768,44.485c-26.667,12.666-56.373-4.24-68.153-7.51c-16.18-4.49-30.249,3.654-44.514,15.176	c-17.333,14-55.666,14-55.666,14",
	"M2.7,6.3c0,0,11-9,25.3,0c8.9,5.6,34.3,40,61,52.7s56.4-4.2,68.2-7.5c16.2-4.5,30.2,3.7,44.5,15.2	c17.3,14,55.7,14,55.7,14",
	"M244.5,58.5c0,0-1.5,18.5-33.5,13c-19.881-3.417-41.953-37.12-73.25-38c-29.51-0.83-46.5,18-77.25,19.25c-28.477,1.157-54-9.25-54-9.25"
]

var colorArray = ["72, 134, 255", "249, 96, 126", "18, 189, 183", "254, 182, 82"]

/*----- Functions -------*/

function init(){
	for(var i=0; i<userArray.length; i++){
		newCard(i);
	}
}

function newCard(index){

	var dummyCard;

	//create the base card container
	dummyCard = document.createElement("div");
	dummyCard.className = "dummyCard";
	dummyCard.id = index;
	container.insertBefore(dummyCard, cardCreator);
	

	user(index);
	dummyCard.appendChild(userArray[index].user);

	icons(index);
	dummyCard.appendChild(userArray[index].icons);

	data(index);
	dummyCard.appendChild(userArray[index].data);

	cardButtons(index);
	dummyCard.appendChild(userArray[index].buttons);

	userArray[index].card = dummyCard;

}

function user(index){

	var cardUser;

	//Prepare the needed variables for the user part
	var nameLetter = userArray[index].firstName.charAt(0);
	var lastNameLetter = userArray[index].lastName.charAt(0);
	var theImage;
	var cardColor = colorArray[Math.floor(Math.random() * colorArray.length)];


	//chack if there is a user image or not
	if(userArray[index].userImage !== ""){
		theImage = "<img src='"+userArray[index].userImage+"'>";
	}else{
		theImage = "";
	}

	//add the user HTML
	cardUser = document.createElement("div");
	cardUser.className = "user";
	cardUser.innerHTML  = "<div class='imgHolder' style='background: rgba("+cardColor+", 0.25)'><div class='initials' style='color:rgb("+cardColor+")'> <span class='nameLetter'>"+nameLetter+"</span><span class='lastNameLetter'>"+lastNameLetter+"</span></div>"+theImage+"<div class='circleDeco fa-stack'><i class='fa fa-circle fa-stack-2x' aria-hidden='true'></i><i class='fa fa-circle-o fa-stack-1x fa-lg' aria-hidden='true' style='color:rgb("+cardColor+")'></i></div></div></div><h3 class='userName'>"+userArray[index].firstName+" "+userArray[index].lastName+"</h3><a href='#' class='twitter'>"+userArray[index].twitter+"</a>";

	userArray[index].user = cardUser;
}

function icons(index){

	var cardIcons;

	cardIcons = document.createElement("div");
	cardIcons.className = "icons";
	cardIcons.innerHTML = "<a href='#'><i class='fa fa-pencil fa-lg' aria-hidden='true'></i></a><a href='#'><i class='fa fa-bell-o fa-lg' aria-hidden='true'></i></a><a href='#' onclick='removeCard("+index+")'><i class='fa fa-trash-o fa-lg' aria-hidden='true'></i></a>";

	userArray[index].icons = cardIcons;
}

function data(index){

	var cardData;
	var colorLine = lineArray[Math.floor(Math.random() * lineArray.length)];

	cardData = document.createElement("div");
	cardData.className = "data";

	if(Number(userArray[index].tasks) > 0){
		cardData.innerHTML = "<div class='line'><svg x='0px' y='0px' viewBox='0 0 260 90'><style type='text/css'>.st0{fill:none;stroke:url(#SVGID_1_);stroke-width:4;stroke-miterlimit:10;}</style><linearGradient id='SVGID_1_' gradientUnits='userSpaceOnUse' x1='2.0334' y1='41.5027' x2='257.3333' y2='41.5027'><stop  offset='0.2043' style='stop-color:#457BBE'/><stop  offset='0.8226' style='stop-color:#C91A74'/></linearGradient><path class='st0' d='"+colorLine+"'/></svg></div><div class='tasks'><p class='tasksNum'>"+userArray[index].tasks+"</p><p class='tasksTxt'>Open Tasks</p></div>";
	}else{
		cardData.innerHTML = "<div class='line'><svg x='0px' y='0px' viewBox='0 0 260 90'enable-background='new 0 0 260 90' xml:space='preserve'><line fill='none' stroke='#D4D4D4' stroke-width='6'stroke-miterlimit='10' x1='9.75' y1='45' x2='247.25' y2='45'/></svg></div><div class='tasks'><p class='tasksNum'>"+userArray[index].tasks+"</p><p class='tasksTxt'>Open Tasks</p></div>";
	}

	userArray[index].data = cardData;

}

function cardButtons(index){

	var cardButtons;

	cardButtons = document.createElement("div");
	cardButtons.className = "cardButtons";
	cardButtons.innerHTML = "<div class='cardBtn'><a href='#' class='cardBtnTxt'><i class='fa fa-th-large fa-lg' aria-hidden='true'></i>&ensp;Cards</a></div><div class='cardBtn'><a href='#' class='cardBtnTxt'><i class='fa fa-user-o fa-lg' aria-hidden='true'></i>&ensp;Profile</a></div>";

	userArray[index].buttons = cardButtons;
}

/*----- Event Listeners -------*/

document.getElementById("addUserBtn").addEventListener("click", function(){
	theForm.classList.remove("creatorDisplay");
});

document.getElementById("cancelBtn").addEventListener("click", function(){
	theForm.classList.add("creatorDisplay");
});

document.getElementById("creatorBtn").addEventListener("click", function(){
	
	var formUserName = document.getElementsByName("formUserName")[0].value;
	var formLastName = document.getElementsByName("formLastName")[0].value;
	var formEmail = document.getElementsByName("formEmail")[0].value;
	var urlImage = document.getElementsByName("urlImage")[0].value;
	var formNumber = document.getElementsByName("formNumber")[0].value;

	userArray.push(
		{
			firstName: formUserName, 
			lastName: formLastName,
			twitter: formEmail,
			userImage: urlImage,
			tasks: Number(formNumber),
			user:"",
			icons:"",
			data:"",
			buttons:"",
			card:""
		}
	)
	
	theForm.classList.add("creatorDisplay");
	newCard(userArray.length-1);
	
});

/*document.getElementsByClassName("delete").addEventListener("click", function(){
	console.log("dsadsa");
	var childDiv = container.getElementsByTagName('div')[this.id],
	theForm.classList.add("creatorDisplay");
});*/

function removeCard(index){
	console.log(index);
	theId = index;
	var childCard = document.getElementById(theId);
	console.log("the id: "+theId);
	childCard.classList.add("creatorDisplay");
}

