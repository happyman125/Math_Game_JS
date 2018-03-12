function HSL(h, s, l) {
  this.h = h;
  this.s = s;
  this.l = l;
}

HSL.complement = function( hsl ) {
    //complement is on the opposite side of the color wheel
   return new HSL((hsl.h + 180) % 360, hsl.s, hsl.l);
};

HSL.prototype.toString = function() {
    return 'hsl(' + this.h + ',' + this.s + '%,' + this.l + '%)';
};
