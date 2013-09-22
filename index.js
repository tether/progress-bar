var $ = require('jquery');

/**
 * Expose 'ProgressBar'
 */
module.exports = ProgressBar;


/**
 * Creates a new progress bar with the provided html element.
 * 
 * @param  {String} el The selector of the html element that contains the progress bar markup.
 */
var ProgressBar = function (selector) {
  this.$el = $(selector);
  this.$steps = this.$el.find('.steps').children();
  this.$lastStep = $(this.$steps[this.$steps.length-2]);
  this.$lastStep.addClass('last-step');
  this.$errorStep = this.$el.find('[aria-error-step=true]');

  this.setStepWidth();
  this.setBarWidth(this.stepWidth);
  this.$el.addClass(this.$el.attr('aria-active-classes'));
};


/**
 * Sets the width of each step in the progress bar. Sets the widths with percentages.
 */
ProgressBar.prototype.setStepWidth = function () {
  this.stepWidth = 100/(this.$steps.length-1); // Account for the error step.
  this.$steps.css({ 'width': this.stepWidth + '% '});
};


/**
 * Sets the width of the completed part of the progress bar to the desired perentage.
 * 
 * @param  {Number} width The percentage completed.
 */
ProgressBar.prototype.setBarWidth = function (width) {
  this.$el.find('.bar-wrapper .bar').css({ 'width': width + '%' });
};


/**
 * Checks if the progress bar has a step with the provided name.
 * 
 * @param  {String} step The step name,
 * @return {Boolean}
 */
ProgressBar.prototype.hasStep = function (step) {
  return this.$el.find('.steps [data-name=' + step + ']').length > 0;
};


/**
 * Changes the active step of the progress bar to the step with the provided name.
 * Updates the completed percentage of the bar to reflect this.
 * 
 * @param  {String} step The step name.
 */
ProgressBar.prototype.changeActiveStep = function (step) {

  if (!this.hasStep(step)) {
    throw "Step not found in available steps for progress bar.";
    return;
  }

  if (step === this.$errorStep.data('name')) {

    this.showErrorStep();

  } else {

    this.$el.find('.steps .active').removeClass('active');

    var newStepIndex = this.$el
                           .find('.steps [data-name=' + step + ']')
                           .addClass('active')
                           .index();

    var newWidth = (newStepIndex + 1) * this.stepWidth;
    
    this.$el.removeClass(this.$el.attr('aria-error-classes'))
            .addClass(this.$el.attr('aria-active-classes'));

    this.setBarWidth(newWidth);

    if (step === this.$lastStep.data('name')) {
      this.$el.addClass(this.$el.attr('aria-finished-classes'))
              .removeClass(
                this.$el.attr('aria-active-classes')
                + ' '
                + this.$el.attr('aria-error-classes')
              );

      this.$lastStep.show();
      this.$errorStep.hide();

      this.$el.trigger('finished');
    }
  }
};


/**
 * Shows the error step of progress bar, bringing the bar's completion percentage to 100%
 * and adding the error class.
 */
ProgressBar.prototype.showErrorStep = function () {
  this.$el.find('.steps .active').removeClass('active');
  
  this.$el.removeClass(
      this.$el.attr('aria-active-classes')
      + ' '
      + this.$el.attr('aria-finished-classes')
    )
    .addClass(this.$el.attr('aria-error-classes'));

  this.setBarWidth(100);

  this.$lastStep.hide();
  this.$errorStep.show();

  this.$el.trigger('error');
};