$(document).ready(function(){

	var imageFolder = "assets/images/";

	function mobileSuit(name, image, health, attack, evasion) {
		this.name = name;
		this.id = name.replace(" ", "_");
		this.image = image;
		this.health = health;
		this.attack = attack;
		this.evasion = evasion;

		this.card = new $("<div>");
		this.card.addClass("gundam-card bd-gd-blue");

		this.card.attr("id", this.id);
		var img = new $("<img>");
		img.attr("src", imageFolder + image);
		img.addClass("gundam-pic");
		this.card.append(img);
		var text = new $("<div>");
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
	};


	var Gundam = new mobileSuit("Gundam Rx-78-2", "Rx-78-2.jpg", 540, 100, 200);
	$("#select").append(Gundam.card);
	Gundam.changeHP(100);
	Gundam.changeAtk(300);
	Gundam.changeEv(100); 
});