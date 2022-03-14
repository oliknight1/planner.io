import { useColorMode } from '@chakra-ui/react';
import React, { FC } from 'react';

const Logo : FC = () => {
	const { colorMode } = useColorMode();
	return (
		<svg width="100%" viewBox="0 0 386 129" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M180.386 81V46.44H193.01C195.25 46.44 197.09 46.696 198.53 47.208C200.002 47.72 201.154 48.424 201.986 49.32C202.85 50.216 203.442 51.256 203.762 52.44C204.114 53.592 204.29 54.808 204.29 56.088C204.29 58.008 203.89 59.592 203.09 60.84C202.322 62.088 201.314 63.08 200.066 63.816C198.818 64.52 197.394 65.016 195.794 65.304C194.226 65.592 192.642 65.736 191.042 65.736H183.65V81H180.386ZM191.138 62.952C192.674 62.952 194.05 62.856 195.266 62.664C196.482 62.472 197.506 62.12 198.338 61.608C199.202 61.064 199.858 60.344 200.306 59.448C200.786 58.52 201.026 57.32 201.026 55.848C201.026 53.672 200.306 52.024 198.866 50.904C197.458 49.784 195.202 49.224 192.098 49.224H183.65V62.952H191.138ZM209.873 81V46.44H212.753V81H209.873ZM236.354 67.944C235.138 68.456 233.906 68.792 232.658 68.952C231.41 69.112 230.162 69.24 228.914 69.336C226.706 69.496 224.978 69.992 223.73 70.824C222.514 71.656 221.906 72.92 221.906 74.616C221.906 75.384 222.05 76.056 222.338 76.632C222.658 77.176 223.058 77.64 223.538 78.024C224.05 78.376 224.626 78.648 225.266 78.84C225.938 79 226.61 79.08 227.282 79.08C228.434 79.08 229.554 78.936 230.642 78.648C231.73 78.36 232.69 77.928 233.522 77.352C234.386 76.744 235.074 75.992 235.586 75.096C236.098 74.168 236.354 73.08 236.354 71.832V67.944ZM231.506 66.504C232.05 66.44 232.69 66.344 233.426 66.216C234.194 66.088 234.818 65.912 235.298 65.688C235.778 65.464 236.066 65.096 236.162 64.584C236.29 64.04 236.354 63.544 236.354 63.096C236.354 61.624 235.874 60.424 234.914 59.496C233.986 58.536 232.402 58.056 230.162 58.056C229.17 58.056 228.258 58.152 227.426 58.344C226.594 58.504 225.858 58.808 225.218 59.256C224.61 59.672 224.098 60.248 223.682 60.984C223.298 61.688 223.042 62.584 222.914 63.672H219.986C220.082 62.2 220.418 60.952 220.994 59.928C221.57 58.872 222.306 58.024 223.202 57.384C224.13 56.712 225.186 56.232 226.37 55.944C227.586 55.624 228.866 55.464 230.21 55.464C231.458 55.464 232.626 55.608 233.714 55.896C234.834 56.152 235.794 56.584 236.594 57.192C237.426 57.768 238.066 58.552 238.514 59.544C238.994 60.536 239.234 61.752 239.234 63.192V76.728C239.234 77.848 239.426 78.568 239.81 78.888C240.226 79.176 241.042 79.096 242.258 78.648V80.904C242.034 80.968 241.698 81.064 241.25 81.192C240.834 81.32 240.418 81.384 240.002 81.384C239.554 81.384 239.122 81.336 238.706 81.24C238.226 81.176 237.842 81.032 237.554 80.808C237.266 80.552 237.026 80.264 236.834 79.944C236.674 79.592 236.562 79.224 236.498 78.84C236.434 78.424 236.402 77.992 236.402 77.544C235.186 78.888 233.794 79.912 232.226 80.616C230.658 81.32 228.962 81.672 227.138 81.672C226.05 81.672 224.994 81.528 223.97 81.24C222.978 80.952 222.098 80.504 221.33 79.896C220.562 79.288 219.954 78.552 219.506 77.688C219.058 76.792 218.834 75.736 218.834 74.52C218.834 70.296 221.73 67.8 227.522 67.032L231.506 66.504ZM249.634 81H246.754V56.136H249.634V59.592C250.786 58.376 251.97 57.384 253.186 56.616C254.434 55.848 255.922 55.464 257.65 55.464C259.186 55.464 260.61 55.736 261.922 56.28C263.234 56.792 264.338 57.704 265.234 59.016C265.842 59.912 266.194 60.84 266.29 61.8C266.418 62.728 266.482 63.704 266.482 64.728V81H263.602V64.776C263.602 62.536 263.106 60.856 262.114 59.736C261.122 58.616 259.474 58.056 257.17 58.056C256.274 58.056 255.458 58.2 254.722 58.488C253.986 58.744 253.314 59.096 252.706 59.544C252.13 59.992 251.634 60.504 251.218 61.08C250.802 61.656 250.482 62.264 250.258 62.904C249.97 63.704 249.794 64.472 249.73 65.208C249.666 65.944 249.634 66.744 249.634 67.608V81ZM276.306 81H273.426V56.136H276.306V59.592C277.458 58.376 278.642 57.384 279.858 56.616C281.106 55.848 282.594 55.464 284.322 55.464C285.858 55.464 287.282 55.736 288.594 56.28C289.906 56.792 291.01 57.704 291.906 59.016C292.514 59.912 292.866 60.84 292.962 61.8C293.09 62.728 293.154 63.704 293.154 64.728V81H290.274V64.776C290.274 62.536 289.778 60.856 288.786 59.736C287.794 58.616 286.146 58.056 283.842 58.056C282.946 58.056 282.13 58.2 281.394 58.488C280.658 58.744 279.986 59.096 279.378 59.544C278.802 59.992 278.306 60.504 277.89 61.08C277.474 61.656 277.154 62.264 276.93 62.904C276.642 63.704 276.466 64.472 276.402 65.208C276.338 65.944 276.306 66.744 276.306 67.608V81ZM318.098 66.84C318.098 65.624 317.922 64.488 317.57 63.432C317.25 62.344 316.754 61.416 316.082 60.648C315.442 59.848 314.626 59.224 313.634 58.776C312.642 58.296 311.506 58.056 310.226 58.056C308.946 58.056 307.81 58.296 306.818 58.776C305.858 59.256 305.026 59.896 304.322 60.696C303.65 61.496 303.106 62.424 302.69 63.48C302.274 64.536 302.002 65.656 301.874 66.84H318.098ZM301.874 69.24C301.874 70.584 302.05 71.864 302.402 73.08C302.754 74.264 303.266 75.304 303.938 76.2C304.642 77.064 305.522 77.768 306.578 78.312C307.634 78.824 308.85 79.08 310.226 79.08C312.114 79.08 313.73 78.584 315.074 77.592C316.418 76.6 317.314 75.192 317.762 73.368H320.978C320.626 74.552 320.162 75.656 319.586 76.68C319.01 77.672 318.29 78.552 317.426 79.32C316.562 80.056 315.538 80.632 314.354 81.048C313.17 81.464 311.794 81.672 310.226 81.672C308.242 81.672 306.53 81.336 305.09 80.664C303.65 79.992 302.466 79.08 301.538 77.928C300.61 76.744 299.922 75.368 299.474 73.8C299.026 72.2 298.802 70.488 298.802 68.664C298.802 66.84 299.058 65.128 299.57 63.528C300.114 61.928 300.866 60.536 301.826 59.352C302.818 58.136 304.018 57.192 305.426 56.52C306.834 55.816 308.434 55.464 310.226 55.464C313.65 55.464 316.338 56.648 318.29 59.016C320.242 61.352 321.202 64.76 321.17 69.24H301.874ZM329.793 81H326.913V56.136H329.793V60.792H329.889C330.689 58.808 331.713 57.432 332.961 56.664C334.241 55.864 335.921 55.464 338.001 55.464V58.584C336.369 58.552 335.025 58.808 333.969 59.352C332.913 59.896 332.065 60.632 331.425 61.56C330.817 62.488 330.385 63.592 330.129 64.872C329.905 66.12 329.793 67.432 329.793 68.808V81ZM339.788 81V76.776H343.292V81H339.788ZM351.295 81V56.136H354.175V81H351.295ZM351.151 50.712V46.44H354.319V50.712H351.151ZM371.392 81.672C369.792 81.64 368.288 81.352 366.88 80.808C365.504 80.264 364.288 79.448 363.232 78.36C362.208 77.272 361.392 75.912 360.784 74.28C360.176 72.648 359.872 70.744 359.872 68.568C359.872 66.744 360.112 65.048 360.592 63.48C361.072 61.88 361.792 60.488 362.752 59.304C363.712 58.12 364.912 57.192 366.352 56.52C367.792 55.816 369.472 55.464 371.392 55.464C373.344 55.464 375.04 55.816 376.48 56.52C377.92 57.192 379.12 58.12 380.08 59.304C381.04 60.456 381.744 61.832 382.192 63.432C382.672 65.032 382.912 66.744 382.912 68.568C382.912 70.552 382.64 72.344 382.096 73.944C381.552 75.544 380.768 76.92 379.744 78.072C378.752 79.224 377.536 80.12 376.096 80.76C374.688 81.368 373.12 81.672 371.392 81.672ZM379.84 68.568C379.84 67.096 379.68 65.72 379.36 64.44C379.04 63.16 378.544 62.056 377.872 61.128C377.2 60.168 376.336 59.416 375.28 58.872C374.224 58.328 372.928 58.056 371.392 58.056C369.888 58.056 368.592 58.36 367.504 58.968C366.448 59.544 365.584 60.328 364.912 61.32C364.24 62.28 363.744 63.4 363.424 64.68C363.104 65.928 362.944 67.224 362.944 68.568C362.944 70.104 363.12 71.528 363.472 72.84C363.856 74.12 364.4 75.224 365.104 76.152C365.808 77.08 366.688 77.8 367.744 78.312C368.8 78.824 370.016 79.08 371.392 79.08C372.896 79.08 374.176 78.792 375.232 78.216C376.32 77.608 377.2 76.808 377.872 75.816C378.544 74.824 379.04 73.704 379.36 72.456C379.68 71.208 379.84 69.912 379.84 68.568Z" fill={colorMode === 'dark' ? '#ffffff' : '#023047'} />
			<path d="M18.3398 53.8633C17.3675 53.8692 16.4369 54.2582 15.7496 54.9455C15.062 55.6329 14.6732 56.5637 14.6673 57.5358V64.3367C14.5948 65.258 14.1774 66.1181 13.4989 66.7453C12.8202 67.3726 11.9302 67.7208 11.0061 67.7208C10.0819 67.7208 9.19189 67.3726 8.51339 66.7453C7.83466 66.1181 7.41753 65.258 7.34499 64.3367V64.7901C7.34499 63.8162 6.95801 62.882 6.26931 62.1933C5.5806 61.5046 4.64638 61.1176 3.67249 61.1176C2.69837 61.1176 1.76438 61.5046 1.07568 62.1933C0.386969 62.882 0 63.8162 0 64.7901V125.114C0 126.088 0.386969 127.022 1.07568 127.711C1.76438 128.4 2.69837 128.787 3.67249 128.787C4.64638 128.787 5.5806 128.4 6.26931 127.711C6.95801 127.022 7.34499 126.088 7.34499 125.114V105.981C7.30509 105.476 7.37038 104.968 7.53632 104.49C7.70227 104.011 7.96545 103.572 8.30913 103.2C8.65303 102.828 9.07015 102.531 9.5342 102.328C9.99848 102.125 10.4995 102.02 11.0061 102.02C11.5126 102.02 12.0138 102.125 12.4779 102.328C12.9419 102.531 13.359 102.828 13.7029 103.2C14.0468 103.572 14.31 104.011 14.476 104.49C14.6419 104.968 14.707 105.476 14.6673 105.981V117.769C14.6673 118.743 15.0541 119.677 15.743 120.366C16.4317 121.055 17.3657 121.442 18.3398 121.442C19.3137 121.442 20.2479 121.055 20.9366 120.366C21.6253 119.677 22.0123 118.743 22.0123 117.769V57.4904C22.0003 56.5242 21.6083 55.6018 20.9207 54.9229C20.2334 54.2439 19.306 53.8633 18.3398 53.8633ZM11.0175 97.1851C10.5344 97.1883 10.0554 97.0953 9.60856 96.9117C9.16151 96.7283 8.75549 96.4578 8.41386 96.1162C8.07223 95.7746 7.80178 95.3686 7.61838 94.9215C7.43499 94.4747 7.34204 93.9957 7.34499 93.5126V76.9637C7.30509 76.4586 7.37038 75.9508 7.53632 75.4723C7.70227 74.9937 7.96545 74.5546 8.30913 74.1826C8.65303 73.8106 9.07015 73.5138 9.5342 73.3107C9.99848 73.1078 10.4995 73.0029 11.0061 73.0029C11.5126 73.0029 12.0138 73.1078 12.4779 73.3107C12.9419 73.5138 13.359 73.8106 13.7029 74.1826C14.0468 74.5546 14.31 74.9937 14.476 75.4723C14.6419 75.9508 14.707 76.4586 14.6673 76.9637V93.5126C14.6703 93.9939 14.5782 94.4709 14.3959 94.9163C14.2139 95.3618 13.9455 95.7669 13.6064 96.1081C13.267 96.4495 12.8637 96.7204 12.4196 96.9051C11.9753 97.0901 11.4988 97.1851 11.0175 97.1851Z" fill="#FFB703" />
			<path d="M47.6744 23.4861C47.1952 23.4861 46.7207 23.5806 46.2777 23.764C45.835 23.9474 45.4326 24.2163 45.0937 24.5552C44.7548 24.8941 44.4859 25.2965 44.3025 25.7392C44.1191 26.182 44.0246 26.6567 44.0246 27.1359V75.2637C44.0246 76.2378 43.6378 77.1718 42.9491 77.8605C42.2602 78.5495 41.3262 78.9362 40.3521 78.9362C39.3782 78.9362 38.444 78.5495 37.7553 77.8605C37.0666 77.1718 36.6798 76.2378 36.6798 75.2637V38.3803C36.7195 37.8752 36.6542 37.3674 36.4883 36.8889C36.3223 36.4101 36.0594 35.971 35.7155 35.599C35.3716 35.227 34.9544 34.9302 34.4904 34.7271C34.0263 34.5242 33.5251 34.4195 33.0187 34.4195C32.512 34.4195 32.011 34.5242 31.5467 34.7271C31.0827 34.9302 30.6655 35.227 30.3216 35.599C29.9777 35.971 29.7146 36.4101 29.5486 36.8889C29.3827 37.3674 29.3176 37.8752 29.3575 38.3803V98.7042C29.3176 99.2093 29.3827 99.7171 29.5486 100.196C29.7146 100.674 29.9777 101.113 30.3216 101.485C30.6655 101.857 31.0827 102.154 31.5467 102.357C32.011 102.56 32.512 102.665 33.0187 102.665C33.5251 102.665 34.0263 102.56 34.4904 102.357C34.9544 102.154 35.3716 101.857 35.7155 101.485C36.0594 101.113 36.3223 100.674 36.4883 100.196C36.6542 99.7171 36.7195 99.2093 36.6798 98.7042V87.7094C36.6798 86.7355 37.0666 85.8013 37.7553 85.1126C38.444 84.4239 39.3782 84.0369 40.3521 84.0369C41.3262 84.0369 42.2602 84.4239 42.9491 85.1126C43.6378 85.8013 44.0246 86.7355 44.0246 87.7094V87.3693C44.0971 88.2906 44.5145 89.1507 45.193 89.778C45.8717 90.4053 46.7617 90.7537 47.6857 90.7537C48.61 90.7537 49.5002 90.4053 50.1787 89.778C50.8572 89.1507 51.2744 88.2906 51.3469 87.3693V27.0226C51.3174 26.0704 50.9169 25.1677 50.2306 24.5069C49.5444 23.8461 48.627 23.4797 47.6744 23.4861Z" fill="#FFB703" />
			<path d="M77.009 0C76.0349 0 75.1009 0.386969 74.4122 1.07568C73.7235 1.76438 73.3365 2.69837 73.3365 3.67249V13.8285C73.3365 14.8024 72.9495 15.7366 72.2608 16.4253C71.5721 17.114 70.6379 17.501 69.664 17.501C68.6899 17.501 67.7559 17.114 67.0672 16.4253C66.3785 15.7366 65.9915 14.8024 65.9915 13.8285V11.9243C65.919 11.003 65.5016 10.1429 64.8231 9.51561C64.1446 8.88834 63.2544 8.54014 62.3303 8.54014C61.4063 8.54014 60.5161 8.88834 59.8376 9.51561C59.1589 10.1429 58.7417 11.003 58.6692 11.9243V72.2484C58.6295 72.7535 58.6946 73.261 58.8605 73.7398C59.0265 74.2184 59.2897 74.6575 59.6336 75.0295C59.9772 75.4015 60.3944 75.6983 60.8586 75.9014C61.3227 76.1043 61.8237 76.2092 62.3303 76.2092C62.837 76.2092 63.338 76.1043 63.8021 75.9014C64.2663 75.6983 64.6835 75.4015 65.0271 75.0295C65.371 74.6575 65.6342 74.2184 65.8002 73.7398C65.9661 73.261 66.0312 72.7535 65.9915 72.2484V26.3649C65.9915 25.3908 66.3785 24.4568 67.0672 23.7681C67.7559 23.0794 68.6899 22.6924 69.664 22.6924C70.6379 22.6924 71.5721 23.0794 72.2608 23.7681C72.9495 24.4568 73.3365 25.3908 73.3365 26.3649V63.9966C73.3365 64.9705 73.7235 65.9047 74.4122 66.5934C75.1009 67.2821 76.0349 67.6691 77.009 67.6691C77.9829 67.6691 78.9171 67.2821 79.6058 66.5934C80.2945 65.9047 80.6815 64.9705 80.6815 63.9966V3.67249C80.6754 2.70041 80.2868 1.7696 79.5992 1.08226C78.9119 0.394684 77.9811 0.00589413 77.009 0Z" fill="#FFB703" />
			<path d="M135.678 60.6417C134.708 60.6479 133.78 61.0373 133.096 61.7253C132.412 62.4134 132.028 63.3442 132.029 64.3142V69.5509C132.029 70.525 131.642 71.459 130.953 72.1477C130.264 72.8364 129.33 73.2234 128.356 73.2234C127.382 73.2234 126.448 72.8364 125.759 72.1477C125.07 71.459 124.684 70.525 124.684 69.5509V54.7929C124.684 53.8191 124.297 52.8848 123.608 52.1961C122.919 51.5074 121.985 51.1204 121.011 51.1204C120.037 51.1204 119.103 51.5074 118.414 52.1961C117.725 52.8848 117.339 53.8191 117.339 54.7929V86.3265C117.266 87.2478 116.849 88.1079 116.17 88.735C115.492 89.3622 114.602 89.7107 113.677 89.7107C112.753 89.7107 111.863 89.3622 111.185 88.735C110.506 88.1079 110.089 87.2478 110.016 86.3265V38.0854C110.016 37.1115 109.629 36.1773 108.94 35.4885C108.252 34.7998 107.318 34.4129 106.344 34.4129C105.37 34.4129 104.436 34.7998 103.747 35.4885C103.058 36.1773 102.671 37.1115 102.671 38.0854V71.7499C102.711 72.255 102.646 72.7628 102.48 73.2413C102.314 73.7199 102.051 74.159 101.707 74.531C101.363 74.903 100.946 75.2 100.482 75.4029C100.018 75.606 99.5167 75.7107 99.01 75.7107C98.5035 75.7107 98.0023 75.606 97.5383 75.4029C97.0742 75.2 96.6571 74.903 96.3132 74.531C95.9693 74.159 95.7063 73.7199 95.5404 73.2413C95.3744 72.7628 95.3091 72.255 95.349 71.7499V23.7581C95.349 22.7842 94.9621 21.85 94.2734 21.1613C93.5847 20.4726 92.6505 20.0856 91.6766 20.0856C90.7024 20.0856 89.7684 20.4726 89.0797 21.1613C88.3908 21.85 88.0041 22.7842 88.0041 23.7581V84.0822C88.0041 85.0563 88.3908 85.9903 89.0797 86.679C89.7684 87.3677 90.7024 87.7547 91.6766 87.7547C92.6505 87.7547 93.5847 87.3677 94.2734 86.679C94.9621 85.9903 95.349 85.0563 95.349 84.0822V84.2862C95.4216 83.3649 95.8387 82.5049 96.5172 81.8776C97.196 81.2505 98.086 80.9021 99.01 80.9021C99.9342 80.9021 100.824 81.2505 101.503 81.8776C102.181 82.5049 102.599 83.3649 102.671 84.2862V98.4095C102.671 99.3834 103.058 100.318 103.747 101.006C104.436 101.695 105.37 102.082 106.344 102.082C107.318 102.082 108.252 101.695 108.94 101.006C109.629 100.318 110.016 99.3834 110.016 98.4095V98.8629C109.976 98.3578 110.042 97.85 110.207 97.3714C110.373 96.8929 110.637 96.4538 110.98 96.0818C111.324 95.7097 111.742 95.413 112.206 95.2099C112.67 95.007 113.171 94.902 113.677 94.902C114.184 94.902 114.685 95.007 115.149 95.2099C115.613 95.413 116.03 95.7097 116.374 96.0818C116.718 96.4538 116.981 96.8929 117.147 97.3714C117.313 97.85 117.378 98.3578 117.339 98.8629V115.117C117.339 116.091 117.725 117.025 118.414 117.714C119.103 118.403 120.037 118.79 121.011 118.79C121.985 118.79 122.919 118.403 123.608 117.714C124.297 117.025 124.684 116.091 124.684 115.117V82.11C124.684 81.1358 125.07 80.2018 125.759 79.5131C126.448 78.8244 127.382 78.4375 128.356 78.4375C129.33 78.4375 130.264 78.8244 130.953 79.5131C131.642 80.2018 132.029 81.1358 132.029 82.11V124.638C131.989 125.143 132.054 125.651 132.22 126.13C132.386 126.608 132.649 127.047 132.993 127.419C133.337 127.791 133.754 128.088 134.218 128.291C134.682 128.494 135.183 128.599 135.69 128.599C136.196 128.599 136.697 128.494 137.162 128.291C137.626 128.088 138.043 127.791 138.387 127.419C138.73 127.047 138.994 126.608 139.16 126.13C139.326 125.651 139.391 125.143 139.351 124.638V64.2916C139.345 63.3215 138.955 62.3932 138.267 61.7093C137.579 61.0255 136.649 60.6417 135.678 60.6417Z" fill="#FFB703" />
		</svg>

	);
};
export default Logo;