$(document).ready(function(){
initPlayer();
 getSongs();

});

var audio = document.getElementById('player');
var music;
//var video = document.getElementById('video');

function initPlayer(){
	$('#shuffle').click(function(){
		$('#playlist').empty();
    console.log(shuffle(music.songs));
	genList(music);
  playSong(0);
});
	}


function getSongs(){
 $.getJSON("js/app.json",function(mjson){
        music=mjson;
  genList(music);
   
 });

}

function playSong(id){
 console.log(id);
 var long = music.songs;
 if(id>=long.length){
  console.log('se acabò');
  audio.pause();   


 }   
 else{
  
  $('#img-album').attr('src',music.songs[id].image);
     $('#player').attr('src',music.songs[id].song);
   //  $('#video').attr('src',music.songs[id].video); 
     audio.play();
     console.log('hay mas canciones');    
     scheduleSong(id);

 
 }
 
}
 
function genList(music){
 console.log(music.songs);  
 $.each(music.songs,function(i,song){
  $('#playlist').append('<li class="list-group-item" id="'+i+'">'+song.name+'</li>');
 });
 $('#playlist li').click(function(){
  var selectedsong =$(this).attr('id');
  playSong(selectedsong);
 });

}
function scheduleSong(id){
 audio.onended = function(){
  console.log('Termino la canciòn');
  playSong(parseInt(id)+1);
 }
}
function shuffle(array){

	for(var random, tenp, position = array.length; position; random= Math.floor(Math.random()*position) , tenp = array[--position], array[position] = array[random], array[random] = tenp);
  return  array;		
}

