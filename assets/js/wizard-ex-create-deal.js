/**
 *  Form Wizard
 */

'use strict';

(function () {
  // flatpickrRange
  const flatpickrRange = document.querySelector('#dealDuration');
  if (flatpickrRange) {
    flatpickrRange.flatpickr({
      mode: 'range'
    });
  }

  // Init custom option check
  window.Helpers.initCustomOptionCheck();
  // Vertical Wizard
  // --------------------------------------------------------------------

  const wizardCreateDeal = document.querySelector('#wizard-create-deal');
  if (typeof wizardCreateDeal !== undefined && wizardCreateDeal !== null) {
    // Wizard form
    const wizardCreateDealForm = wizardCreateDeal.querySelector('#wizard-create-deal-form');
    // Wizard steps
    const wizardCreateDealFormStep1 = wizardCreateDealForm.querySelector('#deal-type');
    const wizardCreateDealFormStep2 = wizardCreateDealForm.querySelector('#deal-details');
    const wizardCreateDealFormStep3 = wizardCreateDealForm.querySelector('#deal-usage');
    const wizardCreateDealFormStep4 = wizardCreateDealForm.querySelector('#review-complete');
    // Wizard next prev button
    const wizardCreateDealNext = [].slice.call(wizardCreateDealForm.querySelectorAll('.btn-next'));
    const wizardCreateDealPrev = [].slice.call(wizardCreateDealForm.querySelectorAll('.btn-prev'));

    let validationStepper = new Stepper(wizardCreateDeal, {
      linear: true
    });

    // Deal Type
    const FormValidation1 = FormValidation.formValidation(wizardCreateDealFormStep1, {
      fields: {
        dealAmount: {
          validators: {
            notEmpty: {
              message: 'Please Enter Items'
            },
            numeric: {
              message: 'The amount must be a number'
            }
          }
        },
        getExtra: {
          validators: {
            notEmpty: {
              message: 'Please Select Extra Item'
            },
			numeric: {
              message: 'The amount must be a number'
            }
          }
        },
		getPercent: {
          validators: {
            notEmpty: {
              message: 'Please Choose Percentage.'
            },
			numeric: {
              message: 'The amount must be a number'
            }
          }
        }
      },

      plugins: {
        trigger: new FormValidation.plugins.Trigger(),
        bootstrap5: new FormValidation.plugins.Bootstrap5({
          // Use this for enabling/changing valid/invalid class
          // eleInvalidClass: '',
          eleValidClass: '',
          rowSelector: '.col-sm-4'
        }),
        autoFocus: new FormValidation.plugins.AutoFocus(),
        submitButton: new FormValidation.plugins.SubmitButton()
      }
    }).on('core.form.valid', function () {
      // Jump to the next step when all fields in the current step are valid
      validationStepper.next();
    });

    // select2 (Region)
    const dealRegion = $('#dealRegion');
    if (dealRegion.length) {
      dealRegion.wrap('<div class="position-relative"></div>');
      dealRegion
        .select2({
          placeholder: 'Select an region',
          dropdownParent: dealRegion.parent()
        })
        .on('change.select2', function () {
          // Revalidate the region field when an option is chosen
          FormValidation1.revalidateField('dealRegion');
        });
    }

    // Deal Details
    const FormValidation2 = FormValidation.formValidation(wizardCreateDealFormStep2, {
      fields: {
        // * Validate the fields here based on your requirements
        dealTitle: {
          validators: {
            notEmpty: {
              message: 'Please enter deal title'
            }
          }
        },
        dealCode: {
          validators: {
            notEmpty: {
              message: 'Please enter deal code'
            },
            stringLength: {
              min: 4,
              max: 10,
              message: 'The deal code must be more than 4 and less than 10 characters long'
            },
            regexp: {
              regexp: /^[A-Z0-9]+$/,
              message: 'The deal code can only consist of capital alphabetical and number'
            }
          }
        },
		dealDuration: {
          validators: {
            notEmpty: {
              message: 'Please Choose deal duration'
            }
          }
        },
      },
      plugins: {
        trigger: new FormValidation.plugins.Trigger(),
        bootstrap5: new FormValidation.plugins.Bootstrap5({
          // Use this for enabling/changing valid/invalid class
          // eleInvalidClass: '',
          eleValidClass: '',
          rowSelector: '.col-sm-6'
        }),
        autoFocus: new FormValidation.plugins.AutoFocus(),
        submitButton: new FormValidation.plugins.SubmitButton()
      }
    }).on('core.form.valid', function () {
      // Jump to the next step when all fields in the current step are valid
      validationStepper.next();
    });

    // select2 (Offered Item)
    const dealStatus = $('#dealStatus');
    if (dealStatus.length) {
      dealStatus.wrap('<div class="position-relative"></div>');
      dealStatus
        .select2({
          placeholder: 'Select an offered item',
          dropdownParent: dealStatus.parent()
        })
        .on('change.select2', function () {
          // Revalidate the field if needed when an option is chosen
          // FormValidation2.revalidateField('dealStatus');
        });
    }

    // Deal Usage
    const FormValidation3 = FormValidation.formValidation(wizardCreateDealFormStep3, {
      fields: {
        // * Validate the fields here based on your requirements
      },
      plugins: {
        trigger: new FormValidation.plugins.Trigger(),
        bootstrap5: new FormValidation.plugins.Bootstrap5({
          // Use this for enabling/changing valid/invalid class
          // eleInvalidClass: '',
          eleValidClass: '',
          rowSelector: '.col-sm-6'
        }),
        autoFocus: new FormValidation.plugins.AutoFocus(),
        submitButton: new FormValidation.plugins.SubmitButton()
      }
    }).on('core.form.valid', function () {
      validationStepper.next();
    });

    // Deal Usage
    const FormValidation4 = FormValidation.formValidation(wizardCreateDealFormStep4, {
      fields: {
        // * Validate the fields here based on your requirements
      },
      plugins: {
        trigger: new FormValidation.plugins.Trigger(),
        bootstrap5: new FormValidation.plugins.Bootstrap5({
          // Use this for enabling/changing valid/invalid class
          // eleInvalidClass: '',
          eleValidClass: '',
          rowSelector: '.col-md-12'
        }),
        autoFocus: new FormValidation.plugins.AutoFocus(),
        submitButton: new FormValidation.plugins.SubmitButton()
      }
    }).on('core.form.valid', function () {
      // You can submit the form
      // wizardCreateDealForm.submit()
      // or send the form data to server via an Ajax request
      // To make the demo simple, I just placed an alert
      alert('Submitted..!!');
    });

    wizardCreateDealNext.forEach(item => {
      item.addEventListener('click', event => {
        // When click the Next button, we will validate the current step
        switch (validationStepper._currentIndex) {
          case 0:
            /* FormValidation1.validate(); */
			var check = true;
			$('#dealAmount').removeClass('redborder');
			$('#numberbox').removeClass('redborder');
			$('#dealType').removeClass('redborder');
			$('input[name=dollDiscount]').removeClass('redborder');
			var dealAmount = $('#dealAmount').val();
			var dealType = $('#dealType').val();
			var numberbox = $('#numberbox').val();
			var dollDiscount = $('input[name=dollDiscount]').val();
			if(dealAmount == ''){
				check = false;
				$('#dealAmount').addClass('redborder');
			}
			
			if(dealType == '' || dealType == null){
				check = false;
				$('#dealType').addClass('redborder');
			}
			if(dealType == 1){
				if(numberbox == ''){
					check = false;
					$('#numberbox').addClass('redborder');
				}
				console.log(numberbox);
				console.log(dealAmount);
				if(Number(dealAmount) < Number(numberbox)){
					check = false;
					$('#numberbox').addClass('redborder');
				}
				
			}
			if(dealType == 2){
				console.log(dollDiscount);
				console.log(dealAmount);
				if(dollDiscount == ''){
					check = false;
					$('input[name=dollDiscount]').addClass('redborder');
				}
				if(Number(dollDiscount) > Number(dealAmount)){
					check = false;
					$('input[name=dollDiscount]').addClass('redborder');
				}
			}
			
			if(check == true){
				validationStepper.next();
			}
            break;

          case 1:
			var check = true;
			$('#dealDescription').removeClass('redborder');
			$('input[name=upassword]').removeClass('redborder');
			$('input[name=StartDate]').removeClass('redborder');
			$('input[name=EndDate]').removeClass('redborder');
			var dealDescription = $('#dealDescription').val();
			var upassword = $('input[name=upassword]').val();
			var StartDate = $('input[name=StartDate]').val();
			var EndDate = $('input[name=EndDate]').val();
			if(dealDescription == ''){
				check = false;
				$('#dealDescription').addClass('redborder');
			}
			if(upassword == ''){
				check = false;
				$('input[name=upassword]').addClass('redborder');
			}
			if(StartDate == ''){
				check = false;
				$('input[name=StartDate]').addClass('redborder');
			}
			if(EndDate == ''){
				check = false;
				$('input[name=EndDate]').addClass('redborder');
			}
			
			if( document.getElementById("upload1").files.length == 0 ){
				check = false;
				alert("no files selected");
			}
			
			if(Date.parse(EndDate) < Date.parse(StartDate)){
				check = false;
				alert("End Date must be grater then Start date");
			}
			var data_s = 'action=Checkpromocode&upassword='+upassword;
			$.ajax({
				type: 'POST', url: 'process.php', data: data_s, async: true, success: function(r) {
					if(r == '0'){
						if(check == true){
							validationStepper.next();
						}
					}else{
						check = false;
						alert("Promocode already exist");
					}
				}
			});
			
           /*  FormValidation2.validate(); */
		   /* setTimeout(function(){
			if(check == true){
				validationStepper.next();
			}
		   },2000); */
            break;

          case 2:
            FormValidation3.validate();
            break;

          case 3:
            FormValidation4.validate();
            break;

          default:
            break;
        }
      });
    });

    wizardCreateDealPrev.forEach(item => {
      item.addEventListener('click', event => {
        switch (validationStepper._currentIndex) {
          case 3:
            validationStepper.previous();
            break;

          case 2:
            validationStepper.previous();
            break;

          case 1:
            validationStepper.previous();
            break;

          case 0:

          default:
            break;
        }
      });
    });
  }
})();
