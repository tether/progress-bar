# Progress Bar

A simple piece of UI to show progress through a set of steps in a checkout, creation of something, etc.

![alt tag](http://f.cl.ly/items/0s1l1p2O2N2o0g291v0U/Screen%20Shot%202013-09-22%20at%2011.53.28%20AM.png)
![alt tag](http://f.cl.ly/items/1n390s213i0q1d1p0h0w/Screen%20Shot%202013-09-22%20at%2011.54.12%20AM.png)

## Installation

  Install with [component(1)](http://component.io):

    $ component install petrofeed/progress-bar

## Getting Started

To use Progress Bar, add the markup for the progress bar to your template.

    <div id="my-progress-bar" class="progress-bar" aria-active-classes="active" aria-error-classes="error">
        <ul class="steps">
          <li data-name="pending" class="active">Pending</li>
          <li data-name="processing">Processing</li>
          <li data-name="finished">Finished</li>
          <li data-name="errored" aria-error-step="true" class="progress-error active">Error</li>
        </ul>

        <div class="bar-wrapper">
          <div class="bar"></div>
        </div>
      </div>

Then create a new progress bar by passing in the string selector of the progress bar.

    var progressBar = new ProgressBar('#my-progress-bar');
    
To change the active step of the progress bar, just call:
    
    progressBar.changeActiveStep('processing');
    
The progress bar step names are defined in the `data-name` attributes on the list items in the `.steps` unordered list.

## Styling

Progress bar comes with some ready to use default styling, but you can change the styling to fit your needs. 

One easy way to do this is to add the classes you want applied to the "active" step and the "error" step, by adding them to the `aria-active-classes` and `aria-error-classes` attributes on the progress bar.

## Events

Two events are fired from the progress bar via jQuery:

`finished`: Triggered when the last step is set to active.

`error`: Triggered when the progress bar's error step is made active.