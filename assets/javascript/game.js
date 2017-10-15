
var imageFolder = "assets/images/";

function mobileSuit(name, image, health, attack, evasion) {
	this.name = name;
	this.id = name.replace(/ /g, "_");
	this.image = image;
	this.health = health;
	this.attack = attack;
	this.evasion = evasion;

	this.card = new $("<div>");
	this.card.addClass("clearfix gundam-card bd-gd-grey");

	this.card.attr("id", this.id);
	this.card.attr("data", this);
	var img = new $("<img>");
	img.attr("src", imageFolder + image);
	img.addClass("gundam-pic");
	this.card.append(img);
	var text = new $("<section>");
	text.addClass("gundam-text");
	var title = new $("<h6>");
	var spName = new $("<span>");
	spName.text(this.name);
	spName.attr("id", this.id+"name");
	title.append(spName);
	text.append(title);
	this.card.append(text);

	var addText = function(txt, id, value) {
		var para = new $("<p>");
		para.text(txt);
		var span = new $("<span>");
		span.attr("id", id);
		span.text(value);
		para.append(span);
		text.append(para);

	};

	addText("Health ", this.id+"hp", this.health);
	addText("Attack ", this.id+"atk", this.attack);
	addText("Evasion ", this.id+"ev", this.evasion);

//Pointless because the object can't be retreived through an click event.

	this.changeHP = function(value) {
		this.health = value;
		$("#" + this.id +"hp").text(value);
	};

	this.changeAtk = function(value) {
		this.attack = value;
		$("#" + this.id +"atk").text(value);
	};

	this.changeEv = function(value) {
		this.evasion = value;
		$("#" + this.id +"ev").text(value);
	};

	this.card.on("click", function(event) {
		console.log("It's coming from inside the mobileSuit");
		console.log(event);
		console.log($(this).attr("data"));
	});


};

$(document).ready(function(){

	var selectedPlayer = false;
	var selectedEnemy = false;

	initialize();

	fazz.changeHP(720);

	$(".gundam-card").on("click", function(event) {
		var select = $(event.currentTarget);
		console.log(select);
		console.log($(this).attr("data"));
		if (!selectedPlayer){
			select.removeClass("bd-gd-grey");
			select.addClass("bd-gd-blue");
			$("#player").append(select);
			selectedPlayer = true;
		} else if (!selectedEnemy) {
			select.removeClass("bd-gd-grey");
			select.addClass("bd-gd-char");
			$("#enemy").append(select);
			selectEnemy = true;
		}
	});

	$("#shoot").on("click", function(event) {});

	function initialize(){
		selectedPlayer = false;
		selectedEnemy = false;
		$("#select").empty();
		$("#defenderArea").empty();
		$("#player").empty();
		$("#enemy").empty();
		$("#instructions").text("Choose your Mobile Suit");
		$("#playerAttack").text("Player Attack");
		$("#resolve").text("Who Hit?");
		$("#enemyAttack").text("Enemy Attack");
		var gundam = new mobileSuit("Gundam Rx-78-2", "Rx-78-2.jpg", 540, 100, 200);
		var fazz = new mobileSuit("Full Armor ZZ", "FAZZ.jpg", 960, 300, 50);
		var wing = new mobileSuit("Wing Gundam", "Wing.png", 360, 400, 300);
		var sazabi = new mobileSuit("Sazabi", "Sazabi.png", 720, 200, 300); 
		$("#select").append(gundam.card);
		$("#select").append(fazz.card); 
		$("#select").append(wing.card);
		$("#select").append(sazabi.card);
	}

});