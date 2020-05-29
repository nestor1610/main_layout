import swal from 'sweetalert2';

declare var $: any;
const types : Array<any> = ['', 'info', 'success', 'warning', 'error', 'question'];
const error = swal.mixin({
	width:'40%'
});

export function notifyManage(response){
  try {

    if(response.error.message !== undefined )
      showNotification(response.message, 4);
    else
      showNotification(response.error, 4);
    console.error(`Error: ${response.status} ${response.statusText}`);

  } catch (error) {

    showNotification(response.error.text, 4);
    console.error(response.error.text);

  }
}

export function showNotification (message, type_msg = 0, text = '', showConfirmButton = false) {
	const success = swal.mixin({
		position: (showConfirmButton) ? 'center' : 'top-end',
		toast: false,
		showConfirmButton: showConfirmButton,
		timer: (showConfirmButton) ? undefined : 2500
	});

	switch (type_msg) {
		case 2:
			return success.fire(message, text, types[type_msg]);

		case 4:
			return error.fire(message, text, types[type_msg]);

		default:
			return success.fire(message, text, types[type_msg]);
	}
}

/* function showNotificationOld(mess, typeMess){

	const type = ['','info','success','warning','danger'];

	const icons = ['',' fa fa-envelope-open','fa fa-check','fa fa-exclamation-circle','fa fa-exclamation-triangle' ]

	$.notify({
		icon: icons[typeMess],
		message: mess

	},{
		type: type[typeMess],
		timer: 4000,
		placement: {
			from: 'top',
			align: 'right'
		},
		template: '<div data-notify="container" style="z-index:1099;" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
			'<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="fa fa-close"></i></button>' +
			'<i class="fa" data-notify="icon"></i> ' +
			'<span data-notify="title">{1}</span> ' +
			'<span data-notify="message">{2}</span>' +
			'<div class="progress" data-notify="progressbar">' +
			'<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
			'</div>' +
			'<a href="{3}" target="{4}" data-notify="url"></a>' +
		'</div>'
	});
} */
