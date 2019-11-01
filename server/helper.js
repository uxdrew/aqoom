module = module.exports = (function () {
    return {
        GetReceiptInfo: function (res) {
            console.log('GetReceiptInfo hit');
            res.send('GetReceiptInfo hit');
        },
        SubmitReceipt: function(res) {
            console.log('SubmitRecipt hit');
            res.send('SubmitRecipt hit');
        }
    };
})();