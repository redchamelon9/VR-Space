//Instantiating new material balls
AFRAME.registerComponent('generate-obj', { 
    init: function() {
      let el = this.el;

      this.addMarker = function(e){
        let scene = document.querySelector('a-scene');

        let newMark = document.createElement('a-sphere');
        newMark.setAttribute('material','color: purple');
        newMark.setAttribute('radius', '0.25');
        newMark.setAttribute('position','1 1 -1');
        newMark.setAttribute('grabbable', {});
        newMark.setAttribute('grabbing-obj', {});
        newMark.setAttribute('droppable');
        newMark.setAttribute('dynamic-body', 'mass:100');
        newMark.setAttribute('id', 'boxy');
        scene.appendChild(newMark);
      }

      this.el.addEventListener('click', this.addMarker);
    },
    remove: function(){
        this.el.removeEventListener('click', this.addMarker)

    }
    
});


//Code for grabbing and destroying the balls
AFRAME.registerComponent('grabbing-obj', {
    init: function() {
      let el = this.el;
      let thisObj = el.object3D.position;
      let i =0;
      

      this.grab = function(e){
        
        if(thisObj.x < -0.5 && thisObj.x > -3 && thisObj.y < 2 && thisObj.y > -0.5 && thisObj.z < 0.25 && thisObj.z > -2){
          el.setAttribute("color", 'red');
          el.removeAttribute("dynamic-body");
          el.setAttribute('animation', "property: position; to: -1 -15 -300; dur: 1500; easing: linear; loop: false");
          
        }
      }

      this.el.addEventListener('dragend', this.grab);
    },
    remove: function(){
      this.el.removeEventListener('dragend', this.grab);

    },
    tick: function() {
      let el = this.el;
      let thisObj = el.object3D.position;

      if(thisObj.z<-299){
        console.log(thisObj.z);
        el.parentElement.removeChild(el);
      }
    }

    
});


