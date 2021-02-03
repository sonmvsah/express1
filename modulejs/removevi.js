function removevi(str) {

    var strReplaced = str.replace(/é|è|ẽ|ẻ|ẹ|ê|ế|ễ|ề|ệ/gi, "e")
        .replace(/ó|ò|ỏ|õ|ọ|ơ|ớ|ở|ỡ|ợ|ờ|ô|ố|ồ|ổ|ỗ|ộ/gi, "o")
        .replace(/ù|ú|ũ|ủ|ụ|ư|ứ|ử|ừ|ữ|ự/gi, 'u')
        .replace(/á|à|ả|ã|ạ|ă|ắ|ẵ|ặ|ằ|â|ấ|ầ|ậ|ẩ|ẫ/gi, 'a')
        .replace(/í|ì|ĩ|ị|ỉ/gi, 'i');
    return strReplaced;
}

module.exports = removevi;