import swal from 'sweetalert2';

const types : Array<any> = ['', 'info', 'success', 'warning', 'error', 'question'];

let setting = {
	yes_message_confirm: 'Si',
	no_message_confirm: 'No'
}

export function ConfirmAction (
	title: string,
	type_message_confirm: number,
	text: string = '',
	yes_message_confirm: string = setting.yes_message_confirm,
	no_message_confirm: string = setting.no_message_confirm,
	show_close_button: boolean = false
	) {
		const swager = swal.mixin({
			// confirmButtonClass: 'btn btn-info',
			// cancelButtonClass: 'btn btn-danger',
			// buttonsStyling: false,
			showCloseButton: show_close_button,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			allowOutsideClick: false,
			allowEnterKey: true,
			focusCancel: true,
			title: title,
			text: text,
			icon: types[type_message_confirm],
			showCancelButton: true,
			confirmButtonText: yes_message_confirm,
			cancelButtonText: no_message_confirm
		});

		return swager.fire({});
}