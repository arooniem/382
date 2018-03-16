import React, { Component } from 'react';
import PropTypes from 'prop-types';
import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';


var CryptoJS = require('crypto-js');

//CryptoAES component
export default class CryptoAES extends Component {
	constructor(props){
		super(props);
		this.state = ({encryptedText: '', decryptedText:''})
	}

	componentWillReceiveProps(nextProps){
		var cipherText = CryptoJS.AES.encrypt(nextProps.clearText, nextProps.secretKey);
		this.setState({encryptedText: cipherText});
		var bytes  = CryptoJS.AES.decrypt(cipherText.toString(), nextProps.secretKey);
		this.setState({decryptedText: bytes.toString(CryptoJS.enc.Utf8)});
	}

	render() {
		return(
			<div>
				<span className='boldFont'>Cipher text: </span><span className='output'>{this.state.encryptedText.toString()}</span><br/>
				<span className='boldFont'>Plain text: </span><span className='output'>{this.state.decryptedText}</span>
			</div>
		);
	}

}

CryptoAES.propTypes = {clearText: PropTypes.string.isRequired, secretKey: PropTypes.string.isRequired}