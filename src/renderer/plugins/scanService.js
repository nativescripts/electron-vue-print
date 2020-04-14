(function() {
    var B = new Array();
    var aP = new Array();
    var b = new Array();
    var i = new Array();
    var c = new Array();
    var ae = 0;
    var f = 2;
    var bg = 2;
    var o = f * bg;
    var bc = 6;
    var a6 = -1;
    var l = 0;
    var aE = -1;
    var au = "";
    var aT = "";
    var aa = -1;
    var X = -1;
    var L = 0;
    var y = 0;
    var e = "";
    var P = 0;
    var bh = 1;
    var aR;
    var af;
    var bi;
    var an;
    var bf;
    var j;
    var a7;
    var d;
    var ax;
    var U;
    var G;
    var aH;
    var aq;
    var r = null;
    var W = null;
    var K = 0, J = 0;
    var m, D;
    var ac;
    var ay = false;
    var s = false;
    var aQ = 200;
    if (!ArrayBuffer.prototype.slice) {
        ArrayBuffer.prototype.slice = function(bo, bk) {
            var bm = new Uint8Array(this);
            if (bk == undefined) {
                bk = bm.length;
            }
            var bj = new ArrayBuffer(bk - bo);
            var bn = new Uint8Array(bj);
            for (var bl = 0; bl < bn.length; bl++) {
                bn[bl] = bm[bl + bo];
            }
            return bj;
        };
    }

    //html >> js  start
    //代码版本说明
    var minVersonRequried = "1.01.0001";
    var currentProductVersion="";

    var newSaveSubDir="20200414"; // C:\Program Files (x86)\uniCapture\scanService\images\20200414   //扫描后的图片存放地址
    var uploadHostUrl="http://localhost:8080/imageTest/RecorderServlet";  // 上传的服务器路径，这个路径最后包含我们的服务端接收模块，是java代码demo，你们开发需要的可以传给你们
    var uploadRemotePath="file:///C:/KodakSDKPath/remotePath";  // 服务器端存放图片的路径
    var uploadLocalPath="file:///C:/KodakSDKPath/localPath";  // 客户端扫描图片的存放的路径
    var batchImageCount=0;  //路径中的图片总量

    function getUploadUrl(){
        var hostUrl = new Array();
        hostUrl[0] = uploadHostUrl;//hosturl
        hostUrl[1] = uploadRemotePath;//remotePath
        return hostUrl;
    }
    function uploadProgress(eventType,eventInfo,currentFileIndex,totalFileNum){
        if(eventType==0){
            var info = currentFileIndex + '/' + totalFileNum + ' : ' + eventInfo;
            alert(info);
            document.getElementById('transferMsg').innerHTML = info;
        }else if(eventType==1){
            var info = '传输完成，总计传输 ' + totalFileNum + '张影像; ' + eventInfo;
            alert(info);
            document.getElementById('successMsg').innerHTML = info;
        }else{
            var info = '传输失败: 总计传输 ' + totalFileNum + '张影像; ' + eventInfo;
            document.getElementById('failedMsg').innerHTML = info;
            alert("上传失败: " + eventInfo);
        }
    }
    function onWaitingCmdFinish(curActiveCmd){
        alert("请等待当前操作完成: " + curActiveCmd + " !");
    }
    function checkVersionNeedUpdate(currentVersion){
        currentProductVersion=currentVersion;
        if(currentVersion<minVersonRequried){
            return 1;
        }else{
            return 0;
        }
    }
    function onVersionNeedUpdate(){
        alert("最新版本:" + minVersonRequried + "(当前版本:" + currentProductVersion + ")， 请到下载页面更新!");
        window.open("http://www.baidu.com");
    }
    function onImageNumChange(curImageNum){
        //alert(curImageNum);
    }
    // end

    function E() {
        W = document.getElementById("detailCanvas");
        ac = W.getContext("2d");
        V(ac);
        W.addEventListener("mousedown", function(bl) {
            document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = "none";
            K = bl.offsetX || bl.pageX - W.offsetLeft;
            J = bl.offsetY || bl.pageY - W.offsetTop;
            m = ac.transformedPoint(K, J);
            D = false;
        }, false);
        W.addEventListener("mousemove", function(bl) {
            K = bl.offsetX || bl.pageX - W.offsetLeft;
            J = bl.offsetY || bl.pageY - W.offsetTop;
            D = true;
            if (m) {
                var bm = ac.transformedPoint(K, J);
                ac.translate(bm.x - m.x, bm.y - m.y);
                Z();
            }
        }, false);
        W.addEventListener("mouseup", function(bl) {
            m = null;
            if (!D) {
                bk(bl.shiftKey ? -1 :1);
            }
        }, false);
        var bk = function(bm) {
            var bn = ac.transformedPoint(K, J);
            ac.translate(bn.x, bn.y);
            var bl = bm;
            ac.scale(bl, bl);
            ac.translate(-bn.x, -bn.y);
            Z();
        };
        var bj = function(bl) {
            var bm = bl.wheelDelta ? bl.wheelDelta / 40 :bl.detail ? -bl.detail :0;
            if (bm > 0) {
                bk(1.1);
            } else {
                if (bm < 0) {
                    bk(.9);
                }
            }
            return bl.preventDefault() && false;
        };
        W.addEventListener("DOMMouseScroll", bj, false);
        W.addEventListener("mousewheel", bj, false);
    }
    function aB(bl, bm, bk) {
        var bj = document.createElement("option");
        bj.value = bm;
        bj.innerHTML = bk;
        bl.appendChild(bj);
    }
    function Q(bj) {
        var bk = bj.split("|");
        if (bk.length == 7) {
            aM(bf, bk[0]);
            aM(j, bk[1]);
            aM(a7, bk[2]);
            aM(d, bk[3]);
            bk[4] == "0" ? ax.checked = false :ax.checked = true;
            bk[5] == "0" ? U.checked = false :U.checked = true;
            bk[6] == "0" ? G.checked = false :G.checked = true;
        }
    }
    function aZ(bj) {
        var bk;
        for (bk = bj.options.length - 1; bk >= 0; bk--) {
            bj.remove(bk);
        }
    }
    function a4(bl) {
        aZ(aq);
        var bn = bl.split("|");
        if (bn.length == 2) {
            var bm = bn[0].split("$");
            for (var bk = 0; bk < bm.length; bk++) {
                var bj = bm[bk];
                aB(aq, bk, bj);
            }
            aq.size = bm.length;
            aM(aq, bn[1]);
        }
    }
    function a1() {
        var bk = bf.options[bf.selectedIndex].value + "|";
        bk += j.options[j.selectedIndex].value + "|";
        bk += a7.options[a7.selectedIndex].value + "|";
        bk += d.options[d.selectedIndex].value + "|";
        if (ax.checked == true) {
            bk += "1|";
        } else {
            bk += "0|";
        }
        if (U.checked == true) {
            bk += "1|";
        } else {
            bk += "0|";
        }
        if (G.checked == true) {
            bk += "1";
        } else {
            bk += "0";
        }
        var bl = "";
        var bj = R("updateParaInfo", 30);
        bl = bj + bk;
        return bl;
    }
    function aM(bl, bn) {
        var bm = bl.options;
        for (var bk, bj = 0; bk = bm[bj]; bj++) {
            if (bk.value == bn) {
                bl.selectedIndex = bj;
                break;
            }
        }
    }
    function a2() {
        an = document.getElementById("paraDialog");
        bf = document.getElementById("paraColorList");
        aB(bf, "2", "彩色");
        aB(bf, "1", "灰度");
        aB(bf, "0", "黑白");
        j = document.getElementById("paraResList");
        aB(j, "100", "100");
        aB(j, "200", "200");
        aB(j, "300", "300");
        aB(j, "600", "600");
        aB(j, "800", "800");
        a7 = document.getElementById("paraAutoFeedList");
        aB(a7, "1", "自动进纸");
        aB(a7, "0", "手工进纸");
        d = document.getElementById("paraCustRotateList");
        aB(d, "0", "不旋转");
        aB(d, "1", "左转90度");
        aB(d, "2", "右转90度");
        ax = document.getElementById("paraAutoDeskrewCheck");
        U = document.getElementById("paraDuplexEnableCheck");
        G = document.getElementById("paraDisplayUICheck");
        var bj = document.getElementById("paraOkBtn");
        var bk = document.getElementById("paraCancelBtn");
        bj.onclick = function() {
            n();
            au = "updateParaInfo";
            var bl = a1();
            h.send(bl);
        };
        bk.onclick = function() {
            an.style.display = "none";
        };
    }
    function aI() {
        aR = document.getElementById("attachDialog");
        af = document.getElementById("attachName");
        bi = "";
        var bj = document.getElementById("attachOkBtn");
        var bk = document.getElementById("attachCancelBtn");
        bj.onclick = function() {
            aR.style.display = "none";
            bi = "ok";
            var bn = af.value;
            var bm = getUploadUrl();
            var bl = a0(bm, bn);
            au = "uploadBatchFile";
            h.send(bl);
            document.getElementById("uploadSpan").innerHTML = "上传中";
            document.getElementById("uploadBtn").disabled = true;
        };
        bk.onclick = function() {
            aR.style.display = "none";
            bi = "cancel";
        };
    }
    function at() {
        aH = document.getElementById("selectSrcDialog");
        aq = document.getElementById("scannerList");
        var bj = document.getElementById("scannerOkBtn");
        var bk = document.getElementById("scannerCancelBtn");
        bj.onclick = function() {
            n();
            au = "updateScannerInfo";
            var bl = R(au, 30);
            var bm = bl + aq.options[aq.selectedIndex].value;
            h.send(bm);
        };
        bk.onclick = function() {
            aH.style.display = "none";
        };
    }
    function bd(bj, bl) {
        var bk = "" + bj;
        while (bk.length < bl) {
            bk = "0" + bk;
        }
        return bk;
    }
    function R(bj, bl) {
        var bk = bj + "";
        while (bk.length < bl) {
            bk = bk + "\0";
        }
        return bk;
    }
    function H() {
        var bl = "";
        var bj = R("InitLoadCache", 30);
        var bk = bd(aQ, 5);
        bl = bj + bk;
        return bl;
    }
    function a0(bn, bk, bl) {
        var bm = "";
        var bj = R("uploadBatchFile", 30);
        bm = bj + (bn + "|" + bk + "|" + bl);
        return bm;
    }
    function M(bl) {
        var bk = "";
        var bj = R("resetSaveSubDir", 30);
        bk = bj + bl;
        return bk;
    }
    function aO(br) {
        var bn = "";
        var bl = R(br, 30);
        var bm;
        if (aE >= 0) {
            bm = l * o + aE;
        } else {
            bm = 0;
        }
        var bk = bd(bm, 5);
        var bo = bd(aa, 5);
        var bq = bd(X, 5);
        var bs = bd(o, 5);
        var bj = bd(l, 5);
        var bp = bd(aE < 0 ? 0 :aE, 5);
        bn = bl + bk + bo + bq;
        bn = bn + bs + bj + bp;
        return bn;
    }
    function az() {
        if (!n()) {
            return;
        }
        if (!w()) {
            return;
        }
        au = "scan";
        var bj = aO(au);
        h.send(bj);
    }
    function p() {
        if (!n()) {
            return;
        }
        if (!w()) {
            return;
        }
        if (!aN()) {
            return;
        }
        a6 = aE;
        au = "scanInsert";
        var bj = aO(au);
        h.send(bj);
    }
    function aV() {
        if (!n()) {
            return;
        }
        if (!w()) {
            return;
        }
        if (!aN()) {
            return;
        }
        a6 = aE;
        au = "scanReplace";
        var bj = aO(au);
        h.send(bj);
    }
    function a3() {
        if (!n()) {
            return;
        }
        au = "selectSrc";
        var bj = aO(au);
        h.send(bj);
    }
    function aJ() {
        if (!n()) {
            return;
        }
        au = "paraSet";
        var bj = aO(au);
        h.send(bj);
    }
    function u(bm) {
        for (var bl = 0; bl < c.length; bl++) {
            c[bl] = null;
        }
        var bk = 0;
        for (var bj = bm * o; bj < (bm + 1) * o && bj < B.length; bj++) {
            c[bk++] = B[bj];
        }
    }
    function aC(bk) {
        var bj = (bk + 1) * o;
        if (bj > ae) {
            bj = ae;
        }
        if (bj - 1 < B.length) {
            return true;
        } else {
            return false;
        }
    }
    function aK() {
        if (!n()) {
            return;
        }
        if (l != 0) {
            l = 0;
            var bj = aC(l);
            if (bj) {
                u(l);
                aW(l, 0, o);
            } else {
                au = "getImageList";
                var bk = aO(au);
                h.send(bk);
            }
        }
    }
    function aS() {
        if (!n()) {
            return;
        }
        if (l - 1 >= 0) {
            l--;
            var bj = aC(l);
            if (bj) {
                u(l);
                aW(l, 0, o);
            } else {
                au = "getImageList";
                var bk = aO(au);
                h.send(bk);
            }
        }
    }
    function ba() {
        var bj = parseInt(ae / o);
        if (ae % o != 0) {
            bj++;
        }
        return bj;
    }
    function ap() {
        if (!n()) {
            return;
        }
        if (l + 1 < ba()) {
            l++;
            var bj = aC(l);
            if (bj) {
                u(l);
                aW(l, 0, o);
            } else {
                au = "getImageList";
                var bk = aO(au);
                h.send(bk);
            }
        }
    }
    function ak() {
        if (!n()) {
            return;
        }
        if (ba() > 0 && l != ba() - 1) {
            l = ba() - 1;
            var bj = aC(l);
            if (bj) {
                u(l);
                aW(l, 0, o);
            } else {
                au = "getImageList";
                var bk = aO(au);
                h.send(bk);
            }
        }
    }
    function A() {
        if (!n()) {
            return;
        }
        if (ae > 0 && !(l == 0 && aE == 0)) {
            l = 0;
            a6 = 0;
            aE = a6;
            var bj = aC(l);
            if (bj) {
                u(l);
                aW(l, 0, o);
                s = false;
            } else {
                s = true;
            }
            q();
        }
    }
    function x() {
        if (!n()) {
            return;
        }
        var bk = a6 + l * o;
        if (bk > 0) {
            if (a6 == 0) {
                if (l > 0) {
                    a6 = o - 1;
                    aE = a6;
                    l--;
                    var bj = aC(l);
                    if (bj) {
                        u(l);
                        aW(l, 0, o);
                        s = false;
                    } else {
                        s = true;
                    }
                }
            } else {
                a6--;
                aE = a6;
                F();
            }
            q();
        }
    }
    function ai() {
        if (!n()) {
            return;
        }
        var bk = a6 + l * o;
        if (bk < ae - 1) {
            if (a6 == o - 1) {
                a6 = 0;
                l++;
                aE = a6;
                var bj = aC(l);
                if (bj) {
                    u(l);
                    aW(l, 0, o);
                    s = false;
                } else {
                    s = true;
                }
            } else {
                a6++;
                aE = a6;
                F();
            }
            q();
        }
    }
    function aw() {
        if (!n()) {
            return;
        }
        if (ae > 0) {
            var bl = ba() - 1;
            var bj = ae - bl * o - 1;
            if (!(l == bl && bj == aE)) {
                l = bl;
                a6 = bj;
                aE = a6;
                var bk = aC(l);
                if (bk) {
                    u(l);
                    aW(l, 0, o);
                    s = false;
                } else {
                    s = true;
                }
                q();
            }
        }
    }
    function aL(bj, bm, bl) {
        var bk = bj[bm];
        bj[bm] = bj[bl];
        bj[bl] = bk;
    }
    function aj() {
        if (!n()) {
            return;
        }
        if (!aN()) {
            return;
        }
        if (B.length < 2) {
            return;
        }
        au = "adjustGoFirst";
        var bj = aO(au);
        h.send(bj);
    }
    function am() {
        if (!n()) {
            return;
        }
        if (!aN()) {
            return;
        }
        if (B.length < 2) {
            return;
        }
        var bj = aE + l * o;
        if (bj <= 0) {
            return;
        }
        au = "adjustGoPrev";
        var bk = aO(au);
        h.send(bk);
    }
    function aU() {
        if (!n()) {
            return;
        }
        if (!aN()) {
            return;
        }
        if (B.length < 2) {
            return;
        }
        var bj = aE + l * o;
        if (bj >= B.length - 1) {
            return;
        }
        au = "adjustGoNext";
        var bk = aO(au);
        h.send(bk);
    }
    function be() {
        if (!n()) {
            return;
        }
        if (!aN()) {
            return;
        }
        if (B.length < 2) {
            return;
        }
        au = "adjustGoLast";
        var bj = aO(au);
        h.send(bj);
    }
    function q() {
        au = "getOriImage";
        var bj = aO(au);
        h.send(bj);
        ay = true;
    }
    function a9() {
        if (!n()) {
            return;
        }
        if (!aN()) {
            return;
        }
        au = "rotateLeft";
        var bj = aO(au);
        h.send(bj);
    }
    function t() {
        if (!n()) {
            return;
        }
        if (!aN()) {
            return;
        }
        au = "rotateRight";
        var bj = aO(au);
        h.send(bj);
    }
    function T() {
        if (!n()) {
            return;
        }
        if (!aN()) {
            return;
        }
        au = "deleteCurrent";
        a6 = aE;
        var bj = aO(au);
        h.send(bj);
    }
    function ad() {
        if (!n()) {
            return;
        }
        if (ae < 1) {
            return;
        }
        au = "deleteAll";
        var bj = aO(au);
        h.send(bj);
    }
    function a() {
        if (!n()) {
            return;
        }
        var bj = M(newSaveSubDir);
        au = "resetSaveSubDir";
        h.send(bj);
    }
    function S() {
        if (!n()) {
            return;
        }
        au = "getDataSrcInfo";
        var bj = aO(au);
        h.send(bj);
    }
    function aY() {
        if (!n()) {
            return;
        }
        au = "getVersionInfo";
        var bj = aO(au);
        h.send(bj);
    }
    function z() {
        if (!n()) {
            return;
        }
        if (!w()) {
            return;
        }
        if (ae < 1) {
            return;
        }
        var bl = af.value;
        var bk = getUploadUrl();
        var bj = a0(bk[0], bk[1]);
        au = "uploadBatchFile";
        h.send(bj);
        document.getElementById("uploadSpan").innerHTML = "上传中";
        document.getElementById("uploadBtn").disabled = true;
    }
    function a5() {
        if (!aG()) {
            return;
        }
        var bj = a0(uploadHostUrl, uploadRemotePath, uploadLocalPath);
        aT = "uploadBatchFile";
        ab.send(bj);
    }
    function al() {
        if (!n()) {
            return;
        }
        if (ae < 1) {
            return;
        }
        var bk = "";
        var bj = R("batchPostProcess", 30);
        bk = bj + "";
        h.send(bk);
    }
    var h = null;
    var ab = null;
    window.addEventListener("load", bb, false);
    function bb() {
        if ("WebSocket" in window) {
            h = new WebSocket("ws://localhost:9002");
            h.binaryType = "arraybuffer";
            h.onopen = ar;
            h.onmessage = ag;
            h.onclose = ao;
            ab = new WebSocket("ws://localhost:9003");
            ab.binaryType = "arraybuffer";
            ab.onopen = ah;
            ab.onmessage = aF;
            ab.onclose = O;
        } else {
            alert("当前浏览器不支持WebSocket!");
        }
        aI();
        E();
        a2();
        at();
        aA();
        N();
    }
    function aN() {
        if (aE >= 0) {
            return true;
        } else {
            alert("请选择图像!");
            return false;
        }
    }
    function w() {
        if (bh == 0) {
            return false;
        } else {
            return true;
        }
    }
    function aG() {
        if (!y) {
            alert("连接已关闭, 请重启服务或刷新当前页面!");
        } else {
            if (aT.length > 0) {
                return false;
            } else {
                return true;
            }
        }
    }
    function n() {
        if (!L) {
            alert("连接已关闭, 请重启服务或刷新当前页面!");
        } else {
            if (au.length > 0) {
                onWaitingCmdFinish(au);
                return false;
            }
            if (P == 1) {
                onVersionNeedUpdate();
                return false;
            }
            return true;
        }
        return false;
    }
    function ar() {
        L = true;
        au = "InitLoadCache";
        var bj = H();
        h.send(bj);
    }
    function ao() {
        alert("连接已关闭...");
        L = false;
    }
    function ah() {
        y = true;
    }
    function O() {
        y = false;
    }
    function a8(bj) {
        return String.fromCharCode.apply(null, new Uint8Array(bj));
    }
    function C(bn) {
        var bk = new ArrayBuffer(bn.length * 2);
        var bj = new Uint16Array(bk);
        for (var bl = 0, bm = bn.length; bl < bm; bl++) {
            bj[bl] = bn.charCodeAt(bl);
        }
        return bk;
    }
    function av(bp, bl, bq) {
        var bo = document.createElement("canvas");
        bo.height = bl;
        bo.width = bp;
        var bn = bo.getContext("2d");
        var bj = bn.getImageData(0, 0, bp, bl);
        var bk = bj.data.length;
        for (var bm = 0; bm < bk; bm++) {
            bj.data[bm] = bq[bm];
        }
        bn.putImageData(bj, 0, 0);
        return bo;
    }
    function aF(bj) {
        if (bj.data instanceof ArrayBuffer) {
            var bk = a8(bj.data.slice(0, 30));
            bk = bk.slice(0, bk.indexOf("\0"));
            if (bk == "uploadProcess" && aT == "uploadBatchFile") {
                var bq = a8(bj.data.slice(30, bj.data.length));
                var bp = bq.split("|");
                if (bp.length == 4) {
                    var bl = bp[0];
                    var bn = bp[1];
                    var bm = bp[2];
                    var bo = bp[3];
                    if (bl == 0) {
                        uploadProgress(bl, bn, bm, bo);
                    } else {
                        if (bl == 1) {
                            aT = "";
                            uploadProgress(bl, bn, bm, bo);
                        } else {
                            aT = "";
                            uploadProgress(bl, bn, bm, bo);
                        }
                    }
                }
            }
        } else {
            alert("Message is received: " + bj.data);
        }
    }
    function ag(bH) {
        var bo = bH.data;
        if (bH.data instanceof ArrayBuffer) {
            var bx = a8(bH.data.slice(0, 30));
            bx = bx.slice(0, bx.indexOf("\0"));
            if (bx == "newScanImage" || bx == "upateThumbImage" || bx == "updateOriImage") {
                var bw = bH.data;
                ae = parseInt(a8(bw.slice(30, 35)));
                batchImageCount = ae;
                onImageNumChange(batchImageCount);
                var br = parseInt(a8(bw.slice(35, 40)));
                var bC = parseInt(a8(bw.slice(40, 45)));
                var bN = parseInt(a8(bw.slice(45, 50)));
                var bJ = 50;
                var bL = new Array();
                for (var bk = 0; bk < br; bk++) {
                    var bj = parseInt(a8(bw.slice(bJ, bJ + 5)));
                    var bD = parseInt(a8(bw.slice(bJ + 5, bJ + 10)));
                    var bt = bj * bD * 4;
                    var bu = new Uint8Array(bw.slice(bJ + 10, bJ + 10 + bt));
                    var bM = av(bj, bD, bu);
                    bL.push(bM);
                    bJ = bJ + 10 + bt;
                }
                var bG = c.length - bL.length;
                if (bG > 0) {
                    for (var bE = 0; bE < bG; bE++) {
                        bL.push(null);
                    }
                }
                if ((au == "scan" || au == "scanInsert" || au == "scanReplace" || au == "getImageList" || au == "deleteCurrent" || au == "rotateLeft" || au == "rotateRight" || au == "InitLoadCache") && bx == "newScanImage") {
                    if (au == "scan") {
                        if (bC != l) {
                            l = bC;
                            c = bL.slice();
                            aW(l, 0, o);
                        } else {
                            c[bN] = bL[0];
                            aW(l, bN, o);
                        }
                        if (B.length < aQ) {
                            if (br > 0) {
                                B.push(bL[br - 1]);
                            }
                        }
                    } else {
                        if (au == "scanInsert") {
                            if (bC != l) {
                                l = bC;
                                c = bL.slice();
                                aW(l, 0, o);
                            } else {
                                for (var bF = bN; bF < c.length - 1; bF++) {
                                    c[bF + 1] = c[bF];
                                }
                                c[bN] = bL[0];
                                aW(l, bN, o);
                            }
                            var bR = l * o + bN;
                            B.splice(bR, 0, bL[0]);
                            if (B.length > aQ) {
                                for (var bK = aQ; bK < B.length; bK++) {
                                    B[bK] = null;
                                }
                                B.slice(0, aQ);
                            }
                        } else {
                            if (au == "scanReplace") {
                                if (bC != l) {
                                    l = bC;
                                    c = bL.slice();
                                    aW(l, 0, o);
                                } else {
                                    c[bN] = bL[0];
                                    aW(l, bN, o);
                                }
                                var bl = l * o + bN;
                                if (bl < B.length) {
                                    B[bl] = bL[0];
                                } else {
                                    if (B.length < aQ) {
                                        B.push(bL[0]);
                                    }
                                }
                            } else {
                                if (au == "getImageList") {
                                    l = bC;
                                    c = bL.slice();
                                    aW(l, 0, o);
                                    au = "";
                                } else {
                                    if (au == "InitLoadCache") {
                                        for (var bK = 0; bK < br; bK++) {
                                            B.push(bL[bK]);
                                        }
                                        au = "";
                                        a6 = ae % o;
                                        if (a6 == 0 && ae > 0) {
                                            a6 = o;
                                        }
                                        if (ba() - 1 >= 0) {
                                            l = ba() - 1;
                                        }
                                        au = "getImageList";
                                        var bB = aO(au);
                                        h.send(bB);
                                    } else {
                                        if (au == "deleteCurrent") {
                                            c = bL.slice();
                                            aW(l, 0, o);
                                            var bR = l * o + bN;
                                            if (bR < B.length) {
                                                B.splice(bR, 1);
                                            }
                                            au = "";
                                        } else {
                                            if (au == "rotateLeft" || au == "rotateRight") {
                                                c[bN] = bL[0];
                                                aW(l, bN, bN + 1);
                                                var bR = l * o + aE;
                                                B[bR] = bL[0];
                                                au = "";
                                                if (ay) {
                                                    q();
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                } else {
                    if (au == "getOriImage" && bx == "updateOriImage") {
                        var bS = l * o + aE;
                        aX(bL[0], bS);
                        au = "";
                        window.location.hash = "#openModal";
                        document.getElementById("openModal").style.display = "block";
                        if (s == true) {
                            au = "getImageList";
                            var bB = aO(au);
                            h.send(bB);
                        }
                    }
                }
                bL = null;
            }
            if (bx == "operationDone") {
                var bR = l * o + aE;
                if (au == "adjustGoPrev") {
                    aL(B, bR, bR - 1);
                    if (aE == 0) {
                        if (l > 0) {
                            aE = o - 1;
                            l--;
                            aW(l, 0, o);
                        }
                    } else {
                        aE = aE - 1;
                        aW(l, aE, aE + 2);
                    }
                } else {
                    if (au == "adjustGoNext") {
                        aL(B, bR, bR + 1);
                        if (aE == o - 1) {
                            if (l < ba() - 1) {
                                aE = 0;
                                l++;
                                aW(l, 0, o);
                            }
                        } else {
                            aE = aE + 1;
                            aW(l, aE - 1, aE + 1);
                        }
                    } else {
                        if (au == "adjustGoFirst") {
                            var bO = B[bR];
                            B.splice(bR, 1);
                            B.splice(0, 0, bO);
                            l = 0;
                            aE = 0;
                            aW(l, 0, o);
                        } else {
                            if (au == "adjustGoLast") {
                                var bO = B[bR];
                                B.splice(bR, 1);
                                B.push(bO);
                                l = ba() - 1;
                                var bz = B.length - l * o - 1;
                                aE = bz;
                                aW(l, 0, o);
                            }
                        }
                    }
                }
                if (au == "getImageList") {
                    au = "";
                    aY();
                } else {
                    if (au == "resetSaveSubDir") {
                        au = "";
                        for (var bA = 0; bA < B.length; bA++) {
                            B[bA] = null;
                        }
                        B = [];
                        ae = 0;
                        batchImageCount = ae;
                        onImageNumChange(batchImageCount);
                        a6 = -1;
                        l = 0;
                        aE = -1;
                        aW(l, 0, o);
                        au = "getImageList";
                        var bB = aO(au);
                        h.send(bB);
                    } else {
                        au = "";
                    }
                }
            }
            if (bx == "scanDone") {
                au = "";
            }
            if (bx == "deleteCurrentDone" || bx == "deleteAllDone") {
                if (au == "deleteCurrent" && bx == "deleteCurrentDone") {
                    var bR = l * o + aE;
                    if (bR < B.length) {
                        B.splice(bR, 1);
                        aW(l, a6, o);
                    } else {
                        aW(l, a6, o);
                    }
                    au = "";
                } else {
                    if (au == "deleteAll" && bx == "deleteAllDone") {
                        for (var bA = 0; bA < B.length; bA++) {
                            B[bA] = null;
                        }
                        B = [];
                        ae = 0;
                        batchImageCount = ae;
                        onImageNumChange(batchImageCount);
                        aW(0, 0, o);
                        a6 = -1;
                        l = 0;
                        aE = -1;
                        au = "";
                    }
                }
            }
            if (bx == "uploadProcess" && au == "uploadBatchFile") {
                var bq = a8(bH.data.slice(30, bH.data.length));
                var bI = bq.split("|");
                if (bI.length == 4) {
                    var by = bI[0];
                    var bs = bI[1];
                    var bn = bI[2];
                    var bQ = bI[3];
                    if (by == 0) {
                        uploadProgress(by, bs, bn, bQ);
                    } else {
                        if (by == 1) {
                            document.getElementById("uploadSpan").innerHTML = "提交";
                            document.getElementById("uploadBtn").disabled = false;
                            au = "";
                            uploadProgress(by, bs, bn, bQ);
                        } else {
                            document.getElementById("uploadSpan").innerHTML = "提交";
                            document.getElementById("uploadBtn").disabled = false;
                            au = "";
                            uploadProgress(by, bs, bn, bQ);
                        }
                    }
                }
            }
            if (bx == "paraInfo" && au == "paraSet") {
                var bm = a8(bH.data.slice(30, bH.data.length));
                Q(bm);
                an.style.display = "block";
                au = "";
            }
            if (bx == "updateParaDone" && au == "updateParaInfo") {
                an.style.display = "none";
                au = "";
            }
            if (bx == "scannerInfo" && au == "selectSrc") {
                var bP = a8(bH.data.slice(30, bH.data.length));
                a4(bP);
                aH.style.display = "block";
                au = "";
            }
            if (bx == "updateScannerInfoDone" && au == "updateScannerInfo") {
                aH.style.display = "none";
                au = "";
            }
            if (bx == "getDataSrcInfoDone" && au == "getDataSrcInfo") {
                e = a8(bH.data.slice(30, bH.data.length));
                bh = 1;
                au = "";
            }
            if (bx == "getVersionInfoDone" && au == "getVersionInfo") {
                var bp = a8(bH.data.slice(30));
                var bv = bp.indexOf("\0");
                if (bv > 0) {
                    bp = bp.slice(0, bv);
                }
                P = checkVersionNeedUpdate(bp);
                au = "";
            }
        } else {
            alert("Message is received: " + bo);
        }
    }
    function F() {
        if (aE >= 0) {
            var bj = parseInt(aE) + l * o;
            if (bj >= ae) {
                var bk = b[aE];
                bk.style.borderColor = "rgb(200, 200, 200)";
                aE = -1;
            } else {
                for (var bl = 0; bl < b.length; bl++) {
                    if (bl != aE) {
                        b[bl].style.borderColor = "rgb(200, 200, 200)";
                    } else {
                        b[bl].style.borderColor = "rgb(255, 0, 0)";
                    }
                }
            }
        } else {
            for (var bl = 0; bl < b.length; bl++) {
                b[bl].style.borderColor = "rgb(200, 200, 200)";
            }
        }
    }
    function aW(bq, bm, bn) {
        for (var bp = bm; bp < bn; bp++) {
            var bj = aP[bp];
            var bk = i[bp];
            var bl = bq * o + bp;
            if (bl < ae) {
                var bo = c[bp];
                bj.getContext("2d").drawImage(bo, 0, 0);
                bk.innerHTML = (bl + 1).toString();
            } else {
                bj.getContext("2d").clearRect(0, 0, bj.width, bj.height);
                bk.innerHTML = "";
            }
        }
        F();
    }
    function k() {
        if (a6 == o) {
            a6 = 0;
            l++;
        }
        aW(l, a6, o);
        a6++;
    }
    function g() {
        var bj = document.getElementById("msgContent").value;
        if (bj) {
            h.send(bj);
        }
    }
    function aA() {
        var bq = document.getElementById("viewContainer");
        while (bq.firstChild) {
            bq.removeChild(bq.firstChild);
        }
        var bw = window.getComputedStyle(bq);
        var bl = bw.getPropertyValue("width").slice(0, -2);
        var bp = bw.getPropertyValue("height").slice(0, -2);
        var bm = (bl - (f - 1) * bc) / f;
        var bo = (bp - (bg - 1) * bc) / bg;
        aa = bm;
        X = bo;
        var bs = 0;
        for (var bt = 0; bt < bg; bt++) {
            var bk = bt * bo + bt * bc;
            for (var bv = 0; bv < f; bv++) {
                var bn = bv * bm + bv * bc;
                var br = document.createElement("div");
                br.className = "imgDes";
                i.push(br);
                var bj = document.createElement("canvas");
                bj.id = bs.toString();
                bj.width = bm;
                bj.height = bo;
                bj.style = "cursor: pointer";
                bj.onselectstart = function() {
                    return false;
                };
                var bu = document.createElement("div");
                bu.style = "position: relative;";
                bu.style.height = bo + "px";
                bu.appendChild(br);
                bu.appendChild(bj);
                var bx = document.createElement("div");
                bx.id = bs.toString() + "_outerDiv";
                bx.className = "outerDiv";
                bx.style.left = bn + "px";
                bx.style.top = bk + "px";
                bx.appendChild(bu);
                bq.appendChild(bx);
                bs++;
                aP.push(bj);
                c.push(bj);
                b.push(bx);
            }
        }
    }
    function v(bk, bl) {
        var bj = bk.toString().length;
        while (bj < bl) {
            bk = "0" + bk;
            bj++;
        }
        return bk;
    }
    function V(bt) {
        var bo = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        var br = bo.createSVGMatrix();
        bt.getTransform = function() {
            return br;
        };
        var bs = [];
        var bp = bt.save;
        bt.save = function() {
            bs.push(br.translate(0, 0));
            return bp.call(bt);
        };
        var bq = bt.restore;
        bt.restore = function() {
            br = bs.pop();
            return bq.call(bt);
        };
        var bl = bt.scale;
        bt.scale = function(bw, bv) {
            br = br.scaleNonUniform(bw, bv);
            return bl.call(bt, bw, bv);
        };
        var bm = bt.rotate;
        bt.rotate = function(bv) {
            br = br.rotate(bv * 180 / Math.PI);
            return bm.call(bt, bv);
        };
        var bk = bt.translate;
        bt.translate = function(bw, bv) {
            br = br.translate(bw, bv);
            return bk.call(bt, bw, bv);
        };
        var bj = bt.transform;
        bt.transform = function(bw, bv, bB, bA, bz, by) {
            var bx = bo.createSVGMatrix();
            bx.a = bw;
            bx.b = bv;
            bx.c = bB;
            bx.d = bA;
            bx.e = bz;
            bx.f = by;
            br = br.multiply(bx);
            return bj.call(bt, bw, bv, bB, bA, bz, by);
        };
        var bn = bt.setTransform;
        bt.setTransform = function(bw, bv, bA, bz, by, bx) {
            br.a = bw;
            br.b = bv;
            br.c = bA;
            br.d = bz;
            br.e = by;
            br.f = bx;
            return bn.call(bt, bw, bv, bA, bz, by, bx);
        };
        var bu = bo.createSVGPoint();
        bt.transformedPoint = function(bv, bw) {
            bu.x = bv;
            bu.y = bw;
            return bu.matrixTransform(br.inverse());
        };
    }
    function Z() {
        var bk = W.getContext("2d");
        var bm = bk.transformedPoint(0, 0);
        var bl = bk.transformedPoint(W.width, W.height);
        bk.clearRect(bm.x, bm.y, bl.x - bm.x, bl.y - bm.y);
        if (r) {
            var bj = (W.width - r.width) * .5, bn = (W.height - r.height) * .5;
            bk.drawImage(r, bj, bn);
        }
    }
    function aX(bj, bk) {
        r = bj;
        W.width = 1e3;
        W.height = 800;
        K = W.width / 2, J = W.height / 2;
        ac = W.getContext("2d");
        V(ac);
        Z();
        document.getElementById("detailImgDes").innerHTML = (bk + 1).toString();
    }
    function Y(bk) {
        if (!n()) {
            return;
        }
        if (bk.target.tagName.toLowerCase() != "canvas") {
            return;
        }
        var bl = bk.target.id;
        a6 = parseInt(bl);
        var bj = a6 + l * o;
        if (bj >= ae) {
            return;
        }
        q();
    }
    function aD(bl) {
        if (bl.target.tagName.toLowerCase() != "canvas") {
            return;
        }
        var bm = parseInt(bl.target.id);
        var bj = parseInt(bm) + l * o;
        if (bj >= ae) {
            return;
        }
        var bk = b[bm];
        bk.style.borderColor = "rgb(255, 0, 0)";
        for (var bn = 0; bn < b.length; bn++) {
            if (bn != bm) {
                b[bn].style.borderColor = "rgb(200, 200, 200)";
            }
        }
        aE = bm;
    }
    function I() {
        window.location.hash = "#";
        document.getElementById("openModal").style.display = "none";
        ay = false;
    }
    function N() {
        document.getElementById("uploadBtn").onclick = z;
        document.getElementById("captureBtn").onclick = az;
        document.getElementById("captureInsertBtn").onclick = p;
        document.getElementById("captureReplaceBtn").onclick = aV;
        document.getElementById("goFirstPageBtn").onclick = aK;
        document.getElementById("goPrevPageBtn").onclick = aS;
        document.getElementById("goNextPageBtn").onclick = ap;
        document.getElementById("goLastPageBtn").onclick = ak;
        document.getElementById("leftRotateBtn").onclick = a9;
        document.getElementById("rightRotateBtn").onclick = t;
        document.getElementById("deleteCurFileBtn").onclick = T;
        document.getElementById("deleteAllFileBtn").onclick = ad;
        document.getElementById("selectCaptureSrcBtn").onclick = a3;
        document.getElementById("commonParaSettingBtn").onclick = aJ;
        document.getElementById("viewContainer").addEventListener("dblclick", Y);
        document.getElementById("viewContainer").addEventListener("click", aD);
        document.getElementById("adjustGoFirstImageBtn").onclick = aj;
        document.getElementById("adjustGoPrevImageBtn").onclick = am;
        document.getElementById("adjustGoNextImageBtn").onclick = aU;
        document.getElementById("adjustGoLastImageBtn").onclick = be;
        document.getElementById("goFirstImageBtn").onclick = A;
        document.getElementById("goPrevImageBtn").onclick = x;
        document.getElementById("goNextImageBtn").onclick = ai;
        document.getElementById("goLastImageBtn").onclick = aw;
        document.getElementById("leftRotateBtnDetail").onclick = a9;
        document.getElementById("rightRotateBtnDetail").onclick = t;
        document.getElementById("onDetailViewCloseBtn").onclick = I;
        document.getElementById("detailCanvas").ondblclick = I;
        document.getElementById("resetSaveDirBtn").onclick = a;
        document.getElementById("startUploadBtn").onclick = a5;
        document.getElementById("batchPostProcessBtn").onclick = al;
    }
})();
