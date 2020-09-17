document.addEventListener('DOMContentLoaded', function(){
     
// Class with storage of scores and methods to update scores

    class Match {
      constructor(leftTeamScore,rightTeamScore){
        this.leftTeamScore = leftTeamScore;
        this.rightTeamScore = rightTeamScore;
      }
      UpdateScore(teamName){
        if(teamName == 'right'){
          this.rightTeamScore++;
        }
        else{
          this.leftTeamScore++;
        }
      }
    }


    // Initialize the match
    var newMatch = new Match(0,0) ;


    renderScore()


  // Our footbal field  which contains balls
   var dragZoneCord = getCurrentCord(document.querySelector('.js-drag-zone'))  , currentDroppable = null;


      document.onmousedown = event => {

      // Checking if  selected item is draggble if not return nothing and exit
      if (!event.target.classList.contains('js-draggable')) return;
        
      
      event.target.ondragstart = function() {
          return false;
        };

        let shiftX = event.clientX - event.target.getBoundingClientRect().left;
        let shiftY = event.clientY - event.target.getBoundingClientRect().top;

        event.target.style.position = 'absolute';
        event.target.style.zIndex = 1000;
        document.body.append(event.target);

        let elemHeight = event.target.offsetHeight;
        let elemWidth = event.target.offsetHeight;


        moveAt(event.pageX, event.pageY);

        // Function of ball dragging
  function moveAt(pageX, pageY) {

    let left = pageX - shiftX;
    let top = pageY - shiftY;


    // Check if we are out of the field 

    if (top <= dragZoneCord.top ) top = dragZoneCord.top;

    if (top >= dragZoneCord.bottom  - elemHeight )  top = dragZoneCord.bottom - elemHeight  ;

    if (left < dragZoneCord.left) left = dragZoneCord.left ;

    if (left > dragZoneCord.right) left = dragZoneCord.right - elemWidth  ;
    
   
    event.target.style.left = left + 'px';
    event.target.style.top = top + 'px';
  }

  // Fucntion where we chech is out ball in dropable object or not 

      function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);

            event.target.hidden = true;
            let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
            event.target.hidden = false;
        

            if (!elemBelow) return;

            let droppableBelow = elemBelow.closest('.js-droppable');
            if (currentDroppable != droppableBelow) {
              currentDroppable = droppableBelow;
              if (currentDroppable) { 
                enterDroppable(currentDroppable,event.target);
              }                
              
            }
      }

  document.addEventListener('mousemove', onMouseMove);

  document.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
    document.onmouseup = null;
  };


  }


// Function that contains list of actions when ball entered white rectangle

function enterDroppable(elem,ball) {
    let teamName = elem.dataset.team
    newMatch.UpdateScore(teamName);
    renderScore();
    if(ball.classList.contains('js-draggable')){
      let clonedBall = ball.cloneNode(true);
      clonedBall.classList.add('js-static');
      clonedBall.style="";
      clonedBall.classList.remove('js-draggable');
      document.querySelector(`.js-${teamName}-players`).append(clonedBall)
    }
  }

// Function that gives us all coordinates  of elements

  function getCurrentCord(elem) {   
    var elemCord = elem.getBoundingClientRect();
    return {
      top: elemCord.top + pageYOffset,
      left: elemCord.left + pageXOffset,
      bottom: elemCord.bottom + window.pageYOffset,
      right: elemCord.right + window.pageXOffset,
    };
  }

// Function that renders score to DOM

  function renderScore(){
    document.querySelector('.js-left-team').innerHTML = newMatch.leftTeamScore;
    document.querySelector('.js-right-team').innerHTML = newMatch.rightTeamScore;
  }



  });




