
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

	this.card.on("click", function(event) {	});

};

$(document).ready(function(){

	var selectedPlayer = false;
	var selectedEnemy = false;
	var lost = false;
	var selected = 0;
	var player;
	var enemy;
//	var enemyChoice = ["shoot", "melee", "counter"];
	var winTable =[
		["tie", "win", "lose"],
		["lose", "tie", "win"],
		["win", "lose", "tie"]];

	initialize();

	
	$(".btn-atk").on("click", function(event) {
		if (selectedEnemy && !lost) {
			var playerChoice = $(this).attr("value");
			var enemyChoice = Math.floor(Math.random(3)*3); 
			var rps = winTable[playerChoice][enemyChoice];
			var plAtk = $("#" + player.attr("id") + "atk").text();
			var plHp = $("#" + player.attr("id") + "hp").text();
			var plEv = $("#" + player.attr("id") + "ev").text();
			var enAtk = $("#" + enemy.attr("id") + "atk").text();
			var enHp = $("#" + enemy.attr("id") + "hp").text();
			var enEv = $("#" + enemy.attr("id") + "ev").text();
			console.log(rps);

			switch(rps) {
				case "win":
						if (!evade(enEv)) {
							$("#" + enemy.attr("id") + "hp").text(enHp - plAtk);
						}
						break;
				case "lose":
						if (!evade(plEv)) {
							$("#" + player.attr("id") + "hp").text(plHp - enAtk);
						} else {
							increaseEvasion(player, plEv);
						}
						break;
				case "tie":
						increaseEvasion(player, plEv);
						break;
				default:
			}
			if ($("#"+enemy.attr("id")+"hp").text() < 0) {
				$("#enemy").empty();
				$("#instructions").text("Choose your enemy Mobile Suit");
				selectedEnemy = false;
				if (selected == 4) {
					$("#instructions").text("You Won! Press Restart to Try Again");
				}
			}
			if ($("#"+player.attr("id")+"hp").text() <0) {
				$("#instructions").text("You Lost. Press Restart to Try Again");
				lost = true;
			}
		}
	});

	$("#restart").on("click", function(event) {
		initialize();
	});

// choose random number between 1-1000
// if number < evader's evasion evade is true
	function evade(evasion) {
		var evade = Math.floor(Math.random(1000)*1000) + 1;
		console.log(evade);
		return evade < evasion;
	}

	function increaseEvasion(card, evasion) {
		if (evasion < 999) {
			var increased = 50 + parseInt(evasion);
			console.log(increased);
			if (increased > 999){
				increased = 999;
			} 
			$("#"+player.attr("id")+"ev").text(increased);
		}
	}

	function initialize(){
		selectedPlayer = false;
		selectedEnemy = false;
		lost = false;
		selected = 0;
		player = 0;
		enemy = 0;
		$("#select").empty();
		// $("#defenderArea").empty();
		$("#player").empty();
		$("#enemy").empty();
		$("#instructions").text("Choose your Mobile Suit");
		$("#playerAttack").text("Player Attack");
		$("#resolve").text("Who Hit?");
		$("#enemyAttack").text("Enemy Attack");
		var gundam = new mobileSuit("Gundam Rx-78-2", "Rx-78-2.jpg", 540, 200, 200);
		var fazz = new mobileSuit("Full Armor ZZ", "FAZZ.jpg", 960, 300, 50);
		var goufC = new mobileSuit("Gouf Custom", "Gouf_Custom.jpg", 540, 150, 250);
		var sazabi = new mobileSuit("Sazabi", "Sazabi.png", 720, 200, 300); 
		$("#select").append(gundam.card);
		$("#select").append(fazz.card); 
		$("#select").append(goufC.card);
		$("#select").append(sazabi.card);
		console.log(selected);

		$(".gundam-card").on("click", function(event) {
		var select = $(event.currentTarget);
		console.log(select);
		if (!selectedPlayer){
			select.removeClass("bd-gd-grey");
			select.addClass("bd-gd-blue");
			$("#player").append(select);
			selectedPlayer = true;
			$("#instructions").text("Choose your enemy Moblie Suit");
			player = select;
			selected += 1;
			console.log(selected);
		} else if (!selectedEnemy) {
			select.removeClass("bd-gd-grey");
			select.addClass("bd-gd-char");
			$("#enemy").append(select);
			selectedEnemy = true;
			enemy = select;
			$("#instructions").text("Defeat your enemy");
			selected += 1;
			console.log(selected);
		}
	});

	}

});