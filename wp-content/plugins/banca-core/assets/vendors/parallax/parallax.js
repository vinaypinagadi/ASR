! function(r, u, d, m) {
    "use strict";
    var o = "parallax",
        n = {
            relativeInput: !1,
            clipRelativeInput: !1,
            calibrationThreshold: 100,
            calibrationDelay: 500,
            supportDelay: 500,
            calibrateX: !1,
            calibrateY: !0,
            invertX: !0,
            invertY: !0,
            limitX: !1,
            limitY: !1,
            scalarX: 10,
            scalarY: 10,
            frictionX: .1,
            frictionY: .1,
            originX: .5,
            originY: .5,
            pointerEvents: !0,
            precision: 1
        };

    function a(t, i) {
        this.element = t, this.$context = r(t).data("api", this), this.$layers = this.$context.find(".layer");
        var e = {
            calibrateX: this.$context.data("calibrate-x") || null,
            calibrateY: this.$context.data("calibrate-y") || null,
            invertX: this.$context.data("invert-x") || null,
            invertY: this.$context.data("invert-y") || null,
            limitX: parseFloat(this.$context.data("limit-x")) || null,
            limitY: parseFloat(this.$context.data("limit-y")) || null,
            scalarX: parseFloat(this.$context.data("scalar-x")) || null,
            scalarY: parseFloat(this.$context.data("scalar-y")) || null,
            frictionX: parseFloat(this.$context.data("friction-x")) || null,
            frictionY: parseFloat(this.$context.data("friction-y")) || null,
            originX: parseFloat(this.$context.data("origin-x")) || null,
            originY: parseFloat(this.$context.data("origin-y")) || null,
            pointerEvents: this.$context.data("pointer-events") || !0,
            precision: parseFloat(this.$context.data("precision")) || 1
        };
        for (var s in e) null === e[s] && delete e[s];
        r.extend(this, n, i, e), this.calibrationTimer = null, this.calibrationFlag = !0, this.enabled = !1, this.depthsX = [], this.depthsY = [], this.raf = null, this.bounds = null, this.ex = 0, this.ey = 0, this.ew = 0, this.eh = 0, this.ecx = 0, this.ecy = 0, this.erx = 0, this.ery = 0, this.cx = 0, this.cy = 0, this.ix = 0, this.iy = 0, this.mx = 0, this.my = 0, this.vx = 0, this.vy = 0, this.onMouseMove = this.onMouseMove.bind(this), this.onDeviceOrientation = this.onDeviceOrientation.bind(this), this.onOrientationTimer = this.onOrientationTimer.bind(this), this.onCalibrationTimer = this.onCalibrationTimer.bind(this), this.onAnimationFrame = this.onAnimationFrame.bind(this), this.onWindowResize = this.onWindowResize.bind(this), this.initialise()
    }
    a.prototype.transformSupport = function(t) {
        for (var i, e, s, o, n = d.createElement("div"), r = !1, a = null, h = !1, l = null, p = null, c = 0, y = this.vendors.length; c < y; c++)
            if (p = null !== this.vendors[c] ? (l = this.vendors[c][0] + "transform", this.vendors[c][1] + "Transform") : l = "transform", n.style[p] !== m) {
                r = !0;
                break
            }
        switch (t) {
            case "2D":
                h = r;
                break;
            case "3D":
                r && (i = d.body || d.createElement("body"), s = (e = d.documentElement).style.overflow, o = !1, d.body || (o = !0, e.style.overflow = "hidden", e.appendChild(i), i.style.overflow = "hidden", i.style.background = ""), i.appendChild(n), n.style[p] = "translate3d(1px,1px,1px)", h = (a = u.getComputedStyle(n).getPropertyValue(l)) !== m && 0 < a.length && "none" !== a, e.style.overflow = s, i.removeChild(n), o && (i.removeAttribute("style"), i.parentNode.removeChild(i)))
        }
        return h
    }, a.prototype.ww = null, a.prototype.wh = null, a.prototype.wcx = null, a.prototype.wcy = null, a.prototype.wrx = null, a.prototype.wry = null, a.prototype.portrait = null, a.prototype.desktop = !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i), a.prototype.vendors = [null, ["-webkit-", "webkit"],
        ["-moz-", "Moz"],
        ["-o-", "O"],
        ["-ms-", "ms"]
    ], a.prototype.motionSupport = !!u.DeviceMotionEvent, a.prototype.orientationSupport = !!u.DeviceOrientationEvent, a.prototype.orientationStatus = 0, a.prototype.transform2DSupport = a.prototype.transformSupport("2D"), a.prototype.transform3DSupport = a.prototype.transformSupport("3D"), a.prototype.propertyCache = {}, a.prototype.initialise = function() {
        "static" === this.$context.css("position") && this.$context.css({
            position: "relative"
        }), this.pointerEvents || this.$context.css({
            pointerEvents: "none"
        }), this.accelerate(this.$context), this.updateLayers(), this.updateDimensions(), this.enable(), this.queueCalibration(this.calibrationDelay)
    }, a.prototype.updateLayers = function() {
        this.$layers = this.$context.find(".layer"), this.depthsX = [], this.depthsY = [], this.$layers.css({
            position: "absolute",
            display: "block",
            left: 0,
            top: 0
        }), this.$layers.first().css({
            position: "relative"
        }), this.accelerate(this.$layers), this.$layers.each(r.proxy(function(t, i) {
            var e = r(i).data("depth") || 0;
            this.depthsX.push(r(i).data("depth-x") || e), this.depthsY.push(r(i).data("depth-y") || e)
        }, this))
    }, a.prototype.updateDimensions = function() {
        this.ww = u.innerWidth, this.wh = u.innerHeight, this.wcx = this.ww * this.originX, this.wcy = this.wh * this.originY, this.wrx = Math.max(this.wcx, this.ww - this.wcx), this.wry = Math.max(this.wcy, this.wh - this.wcy)
    }, a.prototype.updateBounds = function() {
        this.bounds = this.element.getBoundingClientRect(), this.ex = this.bounds.left, this.ey = this.bounds.top, this.ew = this.bounds.width, this.eh = this.bounds.height, this.ecx = this.ew * this.originX, this.ecy = this.eh * this.originY, this.erx = Math.max(this.ecx, this.ew - this.ecx), this.ery = Math.max(this.ecy, this.eh - this.ecy)
    }, a.prototype.queueCalibration = function(t) {
        clearTimeout(this.calibrationTimer), this.calibrationTimer = setTimeout(this.onCalibrationTimer, t)
    }, a.prototype.enable = function() {
        this.enabled || (this.enabled = !0, this.orientationSupport ? (this.portrait = null, u.addEventListener("deviceorientation", this.onDeviceOrientation), setTimeout(this.onOrientationTimer, this.supportDelay)) : (this.cx = 0, this.cy = 0, this.portrait = !1, u.addEventListener("mousemove", this.onMouseMove)), u.addEventListener("resize", this.onWindowResize), this.raf = requestAnimationFrame(this.onAnimationFrame))
    }, a.prototype.disable = function() {
        this.enabled && (this.enabled = !1, this.orientationSupport ? u.removeEventListener("deviceorientation", this.onDeviceOrientation) : u.removeEventListener("mousemove", this.onMouseMove), u.removeEventListener("resize", this.onWindowResize), cancelAnimationFrame(this.raf))
    }, a.prototype.calibrate = function(t, i) {
        this.calibrateX = t === m ? this.calibrateX : t, this.calibrateY = i === m ? this.calibrateY : i
    }, a.prototype.invert = function(t, i) {
        this.invertX = t === m ? this.invertX : t, this.invertY = i === m ? this.invertY : i
    }, a.prototype.friction = function(t, i) {
        this.frictionX = t === m ? this.frictionX : t, this.frictionY = i === m ? this.frictionY : i
    }, a.prototype.scalar = function(t, i) {
        this.scalarX = t === m ? this.scalarX : t, this.scalarY = i === m ? this.scalarY : i
    }, a.prototype.limit = function(t, i) {
        this.limitX = t === m ? this.limitX : t, this.limitY = i === m ? this.limitY : i
    }, a.prototype.origin = function(t, i) {
        this.originX = t === m ? this.originX : t, this.originY = i === m ? this.originY : i
    }, a.prototype.clamp = function(t, i, e) {
        return t = Math.max(t, i), t = Math.min(t, e)
    }, a.prototype.css = function(t, i, e) {
        var s = this.propertyCache[i];
        if (!s)
            for (var o = 0, n = this.vendors.length; o < n; o++)
                if (s = null !== this.vendors[o] ? r.camelCase(this.vendors[o][1] + "-" + i) : i, t.style[s] !== m) {
                    this.propertyCache[i] = s;
                    break
                }
        t.style[s] = e
    }, a.prototype.accelerate = function(t) {
        for (var i = 0, e = t.length; i < e; i++) {
            var s = t[i];
            this.css(s, "transform", "translate3d(0,0,0)"), this.css(s, "transform-style", "preserve-3d"), this.css(s, "backface-visibility", "hidden")
        }
    }, a.prototype.setPosition = function(t, i, e) {
        i += "px", e += "px", this.transform3DSupport ? this.css(t, "transform", "translate3d(" + i + "," + e + ",0)") : this.transform2DSupport ? this.css(t, "transform", "translate(" + i + "," + e + ")") : (t.style.left = i, t.style.top = e)
    }, a.prototype.onOrientationTimer = function(t) {
        this.orientationSupport && 0 === this.orientationStatus && (this.disable(), this.orientationSupport = !1, this.enable())
    }, a.prototype.onCalibrationTimer = function(t) {
        this.calibrationFlag = !0
    }, a.prototype.onWindowResize = function(t) {
        this.updateDimensions()
    }, a.prototype.onAnimationFrame = function() {
        this.updateBounds();
        var t = this.ix - this.cx,
            i = this.iy - this.cy;
        (Math.abs(t) > this.calibrationThreshold || Math.abs(i) > this.calibrationThreshold) && this.queueCalibration(0), this.portrait ? (this.mx = this.calibrateX ? i : this.iy, this.my = this.calibrateY ? t : this.ix) : (this.mx = this.calibrateX ? t : this.ix, this.my = this.calibrateY ? i : this.iy), this.mx *= this.ew * (this.scalarX / 100), this.my *= this.eh * (this.scalarY / 100), isNaN(parseFloat(this.limitX)) || (this.mx = this.clamp(this.mx, -this.limitX, this.limitX)), isNaN(parseFloat(this.limitY)) || (this.my = this.clamp(this.my, -this.limitY, this.limitY)), this.vx += (this.mx - this.vx) * this.frictionX, this.vy += (this.my - this.vy) * this.frictionY;
        for (var e = 0, s = this.$layers.length; e < s; e++) {
            var o = this.depthsX[e],
                n = this.depthsY[e],
                r = this.$layers[e],
                a = this.vx * (o * (this.invertX ? -1 : 1)),
                h = this.vy * (n * (this.invertY ? -1 : 1));
            this.setPosition(r, a, h)
        }
        this.raf = requestAnimationFrame(this.onAnimationFrame)
    }, a.prototype.onDeviceOrientation = function(t) {
        var i, e, s;
        this.desktop || null === t.beta || null === t.gamma || (this.orientationStatus = 1, i = (t.beta || 0) / 30, e = (t.gamma || 0) / 30, s = u.innerHeight > u.innerWidth, this.portrait !== s && (this.portrait = s, this.calibrationFlag = !0), this.calibrationFlag && (this.calibrationFlag = !1, this.cx = i, this.cy = e), this.ix = i, this.iy = e)
    }, a.prototype.onMouseMove = function(t) {
        var i = t.clientX,
            e = t.clientY;
        !this.orientationSupport && this.relativeInput ? (this.clipRelativeInput && (i = Math.max(i, this.ex), i = Math.min(i, this.ex + this.ew), e = Math.max(e, this.ey), e = Math.min(e, this.ey + this.eh)), this.ix = (i - this.ex - this.ecx) / this.erx, this.iy = (e - this.ey - this.ecy) / this.ery) : (this.ix = (i - this.wcx) / this.wrx, this.iy = (e - this.wcy) / this.wry)
    };
    var h = {
        enable: a.prototype.enable,
        disable: a.prototype.disable,
        updateLayers: a.prototype.updateLayers,
        calibrate: a.prototype.calibrate,
        friction: a.prototype.friction,
        invert: a.prototype.invert,
        scalar: a.prototype.scalar,
        limit: a.prototype.limit,
        origin: a.prototype.origin
    };
    r.fn[o] = function(e) {
        var s = arguments;
        return this.each(function() {
            var t = r(this),
                i = t.data(o);
            i || (i = new a(this, e), t.data(o, i)), h[e] && i[e].apply(i, Array.prototype.slice.call(s, 1))
        })
    }
}(window.jQuery || window.Zepto, window, document);