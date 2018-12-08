  /*
  StateEL
  INPROCESS: value: 1, writable: false
  COMPLITED: value: 2, writable: false
  FAILED: value: 3, writable: false
  MAX: value: 3, writable: false
  "labels":["Inprocess","Complited","Failed"]
*/

 /*
  RangeEL
  REGULAR: value: 1, writable: false
  IMPORTANT: value: 2, writable: false
  VERY-IMPORTANT: value: 3, writable: false
  MAX: value: 3, writable: false
  "labels":["Regular","Important","Very-important"]
*/

/* Класс перечислений, функция конструктор. */
 
function Enumeration( enumArguments ) {
      var i = 0, 
        LBL = ""; 
        
    if ( Array.isArray( enumArguments ) ) {
        if ( !enumArguments.every( function(n) {return (typeof(n) === "string");}) ) {
            throw new OtherConstraintViolation( "A list of enumeration labels must be an array of strings!" );
        }
        this.labels = enumArguments; 
    } else { 
        throw new OtherConstraintViolation( "Invalid Enumeration constructor argument: "+ enumArg ); 
    }

    this.MAX = this.labels.length; 
    for ( i = 1; i <= this.labels.length; i++ ) {
        LBL = enumArguments[i-1].toUpperCase(); 
        this[ LBL ] = i; 
    }
    Object.freeze( this );  
    
}


/*
   Экземпляры перечислений.
*/

// Статус.
// { "labels":["Inprocess","Complited","Failed"],"MAX":3,"INPROCESS":1,"COMPLITED":2,"FAILED":3 }
var StateEL = new Enumeration( ["Inprocess", "Completed", "Failed"] );

// Ранг.
// { "labels":["Regular","Important","Very-important"],"MAX":3,"REGULAR":1,"IMPORTANT":2,"VERY-IMPORTANT":3 }
var RangeEL = new Enumeration( ["Regular", "Important", "Very-important"] );
