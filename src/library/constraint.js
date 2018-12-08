/* Классы ошибок проверки нарушений ограничений. */

// Класс указывающий, что нарушения не были обнаруженны.
function NoConstraintViolation() {
  this.message = "";
};

// Класс сообщения ошибки.
function ConstraintViolation( msg, culprit) {
  // Сообщение об ошибке.
  this.message = msg;
  if (culprit) {
    this.culprit = culprit;
  }
};

// Класс нарушения ограничения "обязательное ограничение".
function MandatoryValueConstraintViolation( msg, culprit) {
  ConstraintViolation.call( this, msg, culprit);
};
MandatoryValueConstraintViolation.prototype = new ConstraintViolation();
MandatoryValueConstraintViolation.prototype.constructor = MandatoryValueConstraintViolation;

// Класс нарушения ограничения "ограничение диапазона".
function RangeConstraintViolation( msg, culprit) {
  ConstraintViolation.call( this, msg, culprit);
};
RangeConstraintViolation.prototype = new ConstraintViolation();
RangeConstraintViolation.prototype.constructor = RangeConstraintViolation;

// Класс нарушения ограничения "ограничение уникальности".
function UniquenessConstraintViolation( msg, culprit) {
  ConstraintViolation.call( this, msg, culprit);
};
UniquenessConstraintViolation.prototype = new ConstraintViolation();
UniquenessConstraintViolation.prototype.constructor = UniquenessConstraintViolation;