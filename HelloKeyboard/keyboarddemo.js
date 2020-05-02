class KeyboardDemo{

    registerEvents(){
        document.addEventListener('keydown', function(event) { Key.keyControl(event); });

        var Key = {
            keyboardDemo: this,
            keyControl: function (event) {
                this.keyboardDemo.doSomething(event.keyCode);
            }
        }

    }

    doSomething(code){
    	console.log('KeyCode: ' + code);
    }
}
