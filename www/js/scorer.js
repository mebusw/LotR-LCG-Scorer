var MyApp = Em.Application.create({
    ready: function() {
        console.log('DOM ready');
        console.log($('#jj').html());

        document.addEventListener("deviceready", onDeviceReady, false);

    }

});

function onDeviceReady()
{
    // do your thing!
    //navigator.notification.alert("Cordova is working")
    $("#jj").show();
}

//////////////////////////

MyApp.scorerController = Em.Object.create({
    players: [
        Em.Object.create({name:'Player Tolkien', threatLevel:30, deadHeroTC:0, livingHeroDT:0}),
        Em.Object.create({name:'Player Bilbo', threatLevel:0, deadHeroTC:0, livingHeroDT:0})
    ],
    rounds: 0,
    earnedVP: 0,
    
    finalScore: function() {
        console.log('finalScore ' + this.get('rounds') + this);
    
        var players = this.get('players');
        var sum = 0;
        for (var i = 0; i < players.length; i++) {
            sum += parseInt(players[i].get('threatLevel')) + parseInt(players[i].get('deadHeroTC')) + parseInt(players[i].get('livingHeroDT'));
            //players.objectAt()
        }
        
        sum += this.get('rounds') * 10 - this.get('earnedVP');
        return  sum;
        //return todos.filterProperty('isDone', false).get('length');
    }.property('players.@each.threatLevel', 'players.@each.deadHeroTC', 'players.@each.livingHeroDT', 'rounds', 'earnedVP'),

});

MyApp.scorerController.addObserver('players.@each.threatLevel', function() {
  console.log('players is changing' + MyApp.scorerController.get('finalScore'));
});

MyApp.ScorerView = Em.View.extend({
  quest: [
        {val: 0, name: 'Select Quest'},
        {val: 8, name: 'A Journey to Rhosgobel'},
        {val: 6, name: 'Conflict at the Carrock'},
        {val: 3, name: 'Escape from Dol Guldur'},
        {val: 14, name: 'Flight from Moria'},
        {val: 20, name: 'Foundations of Stone'},
        {val: 15, name: 'Into the Pit'},
        {val: 4, name: 'Journey Down the Anduin'},
        {val: 1, name: 'Passage Through Mirkwood'},
        {val: 11, name: 'Return to Mirkwood'},
        {val: 17, name: 'Road to Rivendell'},
        {val: 10, name: 'The Dead Marshes'},
        {val: 9, name: 'The Hills of Emyn Muil'},
        {val: 5, name: 'The Hunt for Gollum'},
        {val: 19, name: 'The Long Dark'},
        {val: 7, name: 'The Massing at Osgiliath'},
        {val: 16, name: 'The Redhorn Gate'},
        {val: 13, name: 'The Seventh Level'},
        {val: 18, name: 'The Watcher in the Water'}
    ],  
  hero: [
    {val: 0, name: 'Select Hero'},
    {val: 2, name:'&Eacute;owyn'},
    {val: 5, name:'Aragorn (Core Set)'},
    {val: 24, name:'Aragorn (The Watcher in the Water)'},
    {val: 13, name:'Beravor'},
    {val: 21, name:'Bifur'},
    {val: 14, name:'Bilbo Baggins'},
    {val: 18, name:'Boromir'},
    {val: 17, name:'Brand son of Bain'},
    {val: 19, name:'D&aacute;in Ironfoot'},
    {val: 4, name:'D&uacute;nhere'},
    {val: 11, name:'Denethor'},
    {val: 20, name:'Dwalin'},
    {val: 3, name:'Eleanor'},
    {val: 22, name:'Elrohir'},
    {val: 23, name:'Elladan'},
    {val: 15, name:'Frodo Baggins'},
    {val: 10, name:'Gimli'},
    {val: 7, name:'Gl&oacute;in'},
    {val: 12, name:'Glorfindel (Core Set)'},
    {val: 26, name:'Glorfindel (Foundations of Stone)'},
    {val: 25, name:'H&aacute;ma'},
    {val: 9, name:'Legolas'},
    {val: 16, name:'Prince Imrahil'},
    {val: 6, name:'Th&eacute;odred'},
    {val: 8, name:'Thalin'},
  ],
  add: function() {
    console.log('adding');
    var newPlayer = Em.Object.create({name:'Gollum', threatLevel:20, deadHeroTC:0, livingHeroDT:0});
    MyApp.scorerController.get('players').pushObject(newPlayer);
    console.log('added');
    
  },
  edit: function() {
    console.log('editing' );
  },
  remove: function() {
    console.log('removing' );
    MyApp.scorerController.get('players').popObject();
  },
  submit: function() {
    console.log('submitting');
    $.ajax({
       url: "#",
       context: document.body
    }).done(function() {
         //$(this).removeClass("btn");
         console.log('submitted');
    }).success(function() {
         console.log('successed');
    });;
  },

});



MyApp.myText = Em.TextField.extend({
    change: function(evt) {
        console.log(this.get('value'));
        //t[0].set('livingHeroDT', this.get('value'));
        //var t = MyApp.todosController.todos.filterProperty('title', this.get('title'));
        //var isDone = t[0].get('isDone');
        //t[0].set('isDone', !isDone);
    }
});


MyApp.finalScore = MyApp.scorerController.get('finalScore');
console.log(MyApp.finalScore);






