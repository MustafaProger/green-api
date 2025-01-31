import React from "react";
import "./DownloadWhatsApp.scss";

const DownloadWhatsApp = () => {
	return (
		<div className='menu'>
			<div className='menu__wrapper'>
				<img
					width='320'
					alt=''
					src='https://static.whatsapp.net/rsrc.php/v4/yS/r/aGcVD59xVTb.png'
				/>
				<h1>Скачайте WhatsApp для Mac</h1>
				<p>
					Скачайте новое оптимизированное приложение для Mac с поддержкой
					функции звонков.
				</p>

				<a
					href='https://faq.whatsapp.com/1513589699119080/?locale=ru_RU&cms_platform=windows-desktop'
					target='_blank'
					rel='noopener noreferrer'
					className='app-store-button'>
					Установить из App Store
				</a>

				<div className='encryption-info'>
					<input
						type='checkbox'
						id='encryption'
						checked
						readOnly
					/>
					<label htmlFor='encryption'>
						Ваши личные сообщения защищены сквозным шифрованием
					</label>
				</div>
			</div>
		</div>
	);
};

export default DownloadWhatsApp;
