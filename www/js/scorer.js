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
        Em.Object.create({name:'Saron', threatLevel:30, deadHeroTC:0, livingHeroDT:0}),
        Em.Object.create({name:'Bilbo', threatLevel:0, deadHeroTC:0, livingHeroDT:0})
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






