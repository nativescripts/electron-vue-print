/*
 * print Class
 * 2020/4/9
 */

var printTool = {
    /**
     * 获取系统打印机列表
     */
    getPrinters: function() {
        let printers = [];
        try {
            const contents = remote.getCurrentWindow().webContents;
            printers = contents.getPrinters();
        } catch (e) {
            console.error('getPrintersError', e);
        }
        return printers;
    },
    /**
     * 获取系统默认打印机
     */
    getDefaultPrinter: function() {
        return getPrinters().find(element => element.isDefault);
    },
    /**
     * 检测是否安装了某个打印驱动
     */
    checkDriver: function(driverMame) {
        return getPrinters().find(element => (element.options["printer-make-and-model"] || '').includes(driverMame));
    },
    /**
     * 根据打印机名称获取打印机对象
     */
    getPrinterByName: function(name) {
        return getPrinters().find(element => element.name === name);
    }
}
export default printTool
