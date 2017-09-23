webpackJsonp([1], {
    0: function (t, e, a) {
        function n(t) {
            a(156)
        }

        var r = a(5)(a(96), a(969), n, null, null);
        t.exports = r.exports
    }, 100: function (t, e, a) {
        "use strict";
        Object.defineProperty(e, "__esModule", {value: !0});
        var n = a(13);
        e.default = {
            data: function () {
                return {term: "", personalBoard: [], projectList: [], searchResult: [], personalResult: []}
            }, watch: {
                term: function () {
                    var t = this;
                    "" != this.term ? (this.$search(this.term, this.projectList, {keys: ["boardList.boardName"]}).then(function (e) {
                        t.searchResult = e
                    }), this.$search(this.term, this.personalBoard, {keys: ["boardName"]}).then(function (e) {
                        t.personalResult = e
                    })) : (this.searchResult = this.projectList, this.personalResult = this.personalBoard)
                }
            }, created: function () {
                var t = this;
                n.a.$on("initPersonalBoard", function (e) {
                    t.personalBoard = e, t.personalResult = e
                }), n.a.$on("initProjectList", function (e) {
                    t.projectList = e, t.searchResult = e
                })
            }
        }
    }, 101: function (t, e, a) {
        "use strict";
        Object.defineProperty(e, "__esModule", {value: !0});
        var n = a(109), r = a.n(n), s = a(43), o = a.n(s), i = a(13);
        e.default = {
            components: {draggable: o.a}, data: function () {
                return {
                    icon: "chevron-down",
                    OrderByFlag: "boardLocate",
                    disabled: !0,
                    projectList: [],
                    searchResult: [],
                    searhcOptions: {keys: ["boardName"]},
                    personalBoard: [],
                    archiveProjectList: [],
                    archiveBoardList: [],
                    term: ""
                }
            }, watch: {
                OrderByFlag: function (t) {
                    this.disabled = "" !== t
                }, term: function () {
                    var t = this;
                    "" != this.term ? this.$search(this.term, this.projectList, {keys: ["boardList.boardName"]}).then(function (e) {
                        t.searchResult = e
                    }) : this.searchResult = this.projectList
                }
            }, computed: {
                SortPersonalBoard: function () {
                    var t = this.term, e = this.personalBoard;
                    return "" != t && (e = this.personalBoard.filter(function (e) {
                        return r()(e).some(function (a) {
                            return String(e[a]).toLowerCase().indexOf(t) > -1
                        })
                    })), this.lodash.orderBy(e, this.OrderByFlag)
                }, SortProjectBoard: function () {
                    var t = this;
                    return "" != this.term && this.$search(this.term, this.projectList, {keys: ["boardList.boardName"]}).then(function (e) {
                        t.searchResult = e
                    }), this.projectList
                }, dragOptions: function () {
                    return {ghostClass: "ghost", animation: 0, disabled: this.disabled}
                }
            }, methods: {
                showCollapse: function () {
                    "chevron-down" === this.icon ? this.icon = "chevron-up" : this.icon = "chevron-down"
                }, checkMove: function (t) {
                    var e = t.relatedContext, a = t.draggedContext, n = a.element, r = e.element;
                    return console.log("drag" + n.boardName), console.log("relate" + r.boardName), !0
                }, datadragEnd: function (t) {
                    console.log("拖动前索引:" + t.oldIndex), console.log("拖动后索引:" + t.newIndex), console.log(this.personalBoard[0].boardName + this.personalBoard[0].boardLocate);
                    for (var e = 0; e < this.personalBoard.length; e++)this.personalBoard[e].boardLocate = e;
                    console.log(this.personalBoard[0].boardName + this.personalBoard[0].boardLocate)
                }, router: function (t) {
                    this.$router.push({path: "/board/" + t})
                }
            }, created: function () {
                var t = this;
                this.$ajax.post("/Project/getUserProjectList").then(function (e) {
                    t.projectList = e.data.data, t.searchResult = e.data.data, i.a.$emit("initProjectList", t.projectList)
                }).catch(function (t) {
                    console.log(t)
                }), this.$ajax.post("/Board/getUserPersnoalBoardList").then(function (e) {
                    t.personalBoard = e.data.data, i.a.$emit("initPersonalBoard", t.personalBoard)
                }).catch(function (t) {
                    console.log(t)
                }), this.$ajax.post("/Archive/getArchiveProjectList").then(function (e) {
                    t.archiveProjectList = e.data.data
                }).catch(function (t) {
                    console.log(t)
                }), this.$ajax.post("/Archive/getArchiveBoardList").then(function (e) {
                    t.archiveBoardList = e.data.data
                }).catch(function (t) {
                    console.log(t)
                }), i.a.$on("search", function (e) {
                    t.term = e
                })
            }
        }
    }, 102: function (t, e, a) {
        "use strict";
        Object.defineProperty(e, "__esModule", {value: !0});
        var n = a(43), r = a.n(n), s = a(107);
        e.default = {
            components: {draggable: r.a}, data: function () {
                return {
                    boardId: this.$route.params.boardId,
                    boardName: "",
                    right: -300,
                    addCardIsOpen: !1,
                    nCardName: "",
                    onEdit: !1,
                    cardList: [],
                    List: [],
                    startDate: "",
                    endDate: "",
                    showData: !0
                }
            }, methods: {
                cancelDate: function (t) {
                    this.showData = !1
                }, delList: function (t) {
                    this.List.splice(t, 1)
                }, delCard: function (t, e) {
                    console.log(this.List[t].cardList), this.List[t].cardList.splice(e, 1), console.log(this.List[t].cardList.length)
                }, addCard: function (t) {
                    this.addCardIsOpen || (t.target.nextElementSibling.style.display = "block", t.target.style.display = "none", this.addCardIsOpen = !0)
                }, saveCard: function (t, e) {
                    this.List[e].cardList.push({
                        cardId: "1",
                        cardName: this.nCardName,
                        cardIntro: "",
                        cardEndDate: "",
                        cardStartDate: "",
                        cardLocate: this.List[e].cardList.length
                    }), this.nCardName = ""
                }, cancelSave: function (t) {
                    t.target.parentNode.style.display = "none", t.target.parentNode.previousElementSibling.style.display = "block", this.addCardIsOpen = !1
                }, showEditAndDelete: function (t) {
                    var e = t.target;
                    "#EEEEEE" != e.style.backgroundColor && (e.children[0].style.backgroundColor = "#EEEEEE", e.children[0].style.color = "black")
                }, showEditDiv: function (t) {
                    t.target.style.backgroundColor = "#EEEEEE", t.target.style.color = "black"
                }, hideEditAndDelete: function (t) {
                    t.target.children[0].style = ""
                }, onMove: function (t) {
                    var e = t.relatedContext, a = t.draggedContext;
                    e.element, a.element;
                    return !0
                }, dragEnd: function (t) {
                    console.log(t)
                }, datadragEnd: function (t) {
                    console.log("拖动前索引:" + t.oldIndex), console.log("拖动后索引:" + t.newIndex)
                }
            }, computed: {
                height: function () {
                    return window.innerHeight - 150
                }
            }, watch: {
                boardId: function () {
                    var t = this;
                    this.$ajax.post("/Board/getBoardById", {boardId: this.boardId}).then(function (e) {
                        t.boardName = e.data.data.boardName
                    }).catch(function (t) {
                        console.log(t)
                    })
                }, List: function () {
                    for (var t in this.List) {
                        this.List[t].listLocate = t;
                        for (var e in this.List[t].cardList)this.List[t].cardList[e].cardLocate = e
                    }
                }
            }, created: function () {
                var t = this;
                this.$ajax.post("/Card/getCardList").then(function (e) {
                    t.List = e.data.data
                }).catch(function (t) {
                    return console.log(t)
                }), HTMLElement.prototype.__defineGetter__("currentStyle", function () {
                    return this.ownerDocument.defaultView.getComputedStyle(this, null)
                }), this.$ajax.post("/Board/getBoardById", {boardId: this.boardId}).then(function (e) {
                    t.boardName = e.data.data.boardName, t.startDate = e.data.data.boardStartDate, t.endDate = e.data.data.boardEndDate
                }).catch(function (t) {
                    console.log(t)
                })
            }, filters: {
                formatDate: function (t) {
                    var e = new Date(t);
                    return a.i(s.a)(e, "MM-dd")
                }
            }
        }
    }, 103: function (t, e, a) {
        "use strict";
        Object.defineProperty(e, "__esModule", {value: !0});
        var n = a(965), r = a.n(n);
        e.default = {components: {ProjectManage: r.a}}
    }, 104: function (t, e, a) {
        "use strict";
        Object.defineProperty(e, "__esModule", {value: !0});
        var n = a(30), r = a.n(n), s = a(0), o = a.n(s);
        e.default = {
            components: {Icon: o.a}, data: function () {
                return {
                    project: {},
                    isChangeInfo: "no",
                    addLeaguerShow: "no",
                    addLeaguerMsg: {leaguerAccount: ""},
                    deleteLeaguerMsg: {leaguerAccount: ""},
                    form: {projectId: "", projectName: "", projectIntro: ""},
                    boards: [],
                    leaguers: [],
                    role: [{text: "管理员", value: 1}, {text: "普通成员", value: 2}]
                }
            }, methods: {
                changeInfo: function () {
                    this.isChangeInfo = "yes"
                }, notChangeInfo: function () {
                    this.isChangeInfo = "no"
                }, onSubmit: function (t) {
                    var e = this;
                    t.preventDefault(), this.$ajax({
                        method: "POST",
                        url: "/Project/changeProjectInfo",
                        data: r()(this.form)
                    }).then(function (t) {
                        0 === t.data.errcode ? (e.project = t.data.data, e.form = t.data.data, alert(t.data.info), e.notChangeInfo()) : alert(t.data.info)
                    }).catch(function (t) {
                        console.log(t)
                    })
                }, boardClick: function (t) {
                    alert(t)
                }, showAddLeaguer: function () {
                    this.addLeaguerShow = "yes"
                }, addLeaguer: function () {
                    var t = this;
                    this.$ajax({
                        method: "POST",
                        url: "/Project/addProjectLeaguer",
                        data: r()(this.addLeaguerMsg)
                    }).then(function (e) {
                        0 === e.data.errcode ? (t.leaguers = e.data.data, alert(e.data.info)) : alert(e.data.info)
                    }).catch(function (t) {
                        console.log(t)
                    })
                }, deleteLeaguer: function (t) {
                    var e = this;
                    this.deleteLeaguerMsg.leaguerAccount = t, this.$ajax({
                        method: "POST",
                        url: "/Project/deleteProjectLeaguer",
                        data: r()(this.deleteLeaguerMsg)
                    }).then(function (t) {
                        0 === t.data.errcode ? (e.leaguers = t.data.data, alert(t.data.info)) : alert(t.data.info)
                    }).catch(function (t) {
                        console.log(t)
                    })
                }, projectArchive: function (t) {
                    ({}).projectId = t, this.$ajax({
                        method: "POST",
                        url: "/Project/archiveProject",
                        data: r()(this.data)
                    }).then(function (t) {
                        t.data.errcode, alert(t.data.info)
                    }).catch(function (t) {
                        console.log(t)
                    })
                }, updateRole: function (t, e) {
                    var a = this, n = {};
                    e = 1 == e ? 2 : 1, n.leaguerAccount = t, n.roleId = e, this.$ajax({
                        method: "POST",
                        url: "/Role/changeLeaguerRole",
                        data: r()(n)
                    }).then(function (t) {
                        0 === t.data.errcode && (a.leaguers = t.data.data, alert(t.data.info))
                    }).catch(function (t) {
                        console.log(t)
                    })
                }
            }, created: function () {
                var t = this;
                this.$ajax.post("/Project/getProjectInfo").then(function (e) {
                    t.project = e.data.data, t.form = e.data.data
                }).catch(function (t) {
                    console.log(t)
                }), this.$ajax.post("/Project/getProjectLeaguerList").then(function (e) {
                    t.leaguers = e.data.data
                }).catch(function (t) {
                    console.log(t)
                }), this.$ajax.post("/Project/getBoardListByProjectId").then(function (e) {
                    t.boards = e.data.data
                }).catch(function (t) {
                    console.log(t)
                })
            }
        }
    }, 105: function (t, e, a) {
        "use strict";
        Object.defineProperty(e, "__esModule", {value: !0});
        var n = a(967), r = a.n(n);
        e.default = {components: {UserInfo: r.a}}
    }, 106: function (t, e, a) {
        "use strict";
        Object.defineProperty(e, "__esModule", {value: !0});
        var n = a(30), r = a.n(n), s = a(0), o = a.n(s);
        e.default = {
            components: {Icon: o.a}, methods: {
                onShow: function () {
                    this.isShow = !0
                }, onHide: function () {
                    this.isShow = !1
                }, cardShow: function () {
                    this.isCardShow = "yes"
                }, cardHide: function () {
                    this.isCardShow = "no"
                }, changePwd: function () {
                    this.changePwdShow = "yes"
                }, changePwdHide: function () {
                    this.changePwdShow = "no"
                }, onSubmit: function (t) {
                    var e = this;
                    t.preventDefault();
                    var a = this.form;
                    this.$ajax({method: "POST", url: "/User/changeUserInfo", data: r()(a)}).then(function (t) {
                        0 === t.data.errcode ? (e.user = t.data.data, a.userSex = t.data.data.userSex, a.userEmail = t.data.data.userEmail, a.userIntro = t.data.data.userIntro, alert(t.data.info), e.notChangeInfo()) : alert(t.data.info)
                    }).catch(function (t) {
                        console.log(t)
                    })
                }, onPwdSubmit: function (t) {
                    var e = this;
                    t.preventDefault();
                    var a = this.form2;
                    a.oldPwd != this.user.userPassword ? (alert(this.user.userPassword), alert("原密码错误，请重新输入!")) : a.newPwd != a.newPwdConfirm ? alert("两次新密码输入不一致，请重新输入!") : this.$ajax({
                        method: "POST",
                        url: "/User/changeUserPassword",
                        data: r()(this.form2)
                    }).then(function (t) {
                        0 === t.data.errcode ? (e.user.userPassword = t.data.data.userPassword, alert(t.data.info), e.form2 = {
                            oldPwd: "",
                            newPwd: "",
                            newPwdConfirm: ""
                        }, e.changePwdHide()) : alert(t.data.info)
                    }).catch(function (t) {
                        console.log(t)
                    })
                }, changeInfo: function () {
                    this.isChangeInfo = "yes"
                }, notChangeInfo: function () {
                    this.isChangeInfo = "no"
                }, showAddFriend: function () {
                    this.addFriendShow = "yes"
                }, addFriend: function () {
                    var t = this;
                    this.$ajax({
                        method: "POST",
                        url: "/UserFriend/addFriend",
                        data: r()(this.addFriendMsg)
                    }).then(function (e) {
                        0 === e.data.errcode ? (t.friends = e.data.data, alert(e.data.info)) : alert(e.data.info)
                    }).catch(function (t) {
                        console.log(t)
                    })
                }, deleteFriend: function (t) {
                    var e = this;
                    this.deleteFriendMsg.friendAccount = t, this.$ajax({
                        method: "POST",
                        url: "/UserFriend/deleteFriend",
                        data: r()(this.deleteFriendMsg)
                    }).then(function (t) {
                        0 === t.data.errcode ? (e.friends = t.data.data, alert(t.data.info)) : alert(t.data.info)
                    }).catch(function (t) {
                        console.log(t)
                    })
                }, editAvatar: function () {
                    var t = this;
                    if (null !== this.avatarInput) {
                        var e = new FormData;
                        e.append("userAvatar", this.avatarInput), this.$ajax.post("/User/changeAvatar", e, {headers: {"Content-Type": "multipart/form-data"}}).then(function (e) {
                            0 === e.data.errcode ? (t.user.userAvatar = e.data.data.userAvatar, alert(e.data.info), t.avatarInput = null, t.cardHide()) : alert(e.data.info)
                        }).catch(function (t) {
                            console.log(t)
                        })
                    }
                }, changeImage: function (t) {
                    var e = t.target.files[0], a = new FileReader, n = this;
                    a.readAsDataURL(e), a.onload = function (t) {
                        n.user.userAvatar = this.result
                    }
                }
            }, data: function () {
                return {
                    user: {},
                    avatarInput: null,
                    isShow: !1,
                    isCardShow: "no",
                    isChangeInfo: "no",
                    changePwdShow: "no",
                    addFriendShow: "no",
                    addFriendMsg: {friendAccount: ""},
                    deleteFriendMsg: {friendAccount: ""},
                    form: {userEmail: "", userSex: null, userIntro: ""},
                    form2: {oldPwd: "", newPwd: "", newPwdConfirm: ""},
                    sex: [{text: "选择性别", value: null}, {text: "男", value: 0}, {text: "女", value: 1}],
                    friends: []
                }
            }, created: function () {
                var t = this;
                this.$ajax.post("/User/getUserInfoById").then(function (e) {
                    var a = t.form;
                    t.user = e.data.data, a.userSex = e.data.data.userSex, a.userEmail = e.data.data.userEmail, a.userIntro = e.data.data.userIntro
                }).catch(function (t) {
                    console.log(t)
                }), this.$ajax.post("/UserFriend/getFriendList").then(function (e) {
                    t.friends = e.data.data
                }).catch(function (t) {
                    console.log(t)
                })
            }
        }
    }, 107: function (t, e, a) {
        "use strict";
        function n(t, e) {
            /(y+)/.test(e) && (e = e.replace(RegExp.$1, (t.getFullYear() + "").substr(4 - RegExp.$1.length)));
            var a = {
                "M+": t.getMonth() + 1,
                "d+": t.getDate(),
                "h+": t.getHours(),
                "m+": t.getMinutes(),
                "s+": t.getSeconds()
            };
            for (var n in a)if (new RegExp("(" + n + ")").test(e)) {
                var s = a[n] + "";
                e = e.replace(RegExp.$1, 1 === RegExp.$1.length ? s : r(s))
            }
            return e
        }

        function r(t) {
            return ("00" + t).substr(t.length)
        }

        e.a = n
    }, 108: function (t, e, a) {
        "use strict";
        Object.defineProperty(e, "__esModule", {value: !0});
        var n = a(3), r = a(55), s = a.n(r), o = a(46), i = a(47), c = a(49), l = (a.n(c), a(50)),
            d = (a.n(l), a(53), a(0)), u = a.n(d), h = a(45), v = a.n(h), f = a(54), p = a(56), m = a.n(p), b = a(52),
            g = a.n(b), _ = a(48), y = a.n(_), x = a(51);
        a.n(x);
        n.default.config.productionTip = !1, o.a.mode = "history", n.default.use(i.a), n.default.use(f.a), n.default.use(m.a), n.default.use(y.a), n.default.component("icon", u.a), n.default.prototype.$ajax = v.a, n.default.prototype.lodash = g.a, new n.default({
            el: "#app",
            router: o.a,
            template: "<App/>",
            components: {App: s.a}
        })
    }, 13: function (t, e, a) {
        "use strict";
        var n = a(3), r = new n.default;
        e.a = r
    }, 155: function (t, e) {
    }, 156: function (t, e) {
    }, 157: function (t, e) {
    }, 158: function (t, e) {
    }, 159: function (t, e) {
    }, 160: function (t, e) {
    }, 161: function (t, e) {
    }, 162: function (t, e) {
    }, 163: function (t, e) {
    }, 164: function (t, e) {
    }, 169: function (t, e, a) {
        t.exports = a.p + "/img/SIXTEAM.86e0bd8.png"
    }, 170: function (t, e, a) {
        t.exports = a.p + "/img/agzou.9f3c775.jpg"
    }, 171: function (t, e, a) {
        t.exports = a.p + "/img/pay.3e4377f.jpg"
    }, 172: function (t, e) {
        t.exports = "data:image/png;base64,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"
    }, 46: function (t, e, a) {
        "use strict";
        var n = a(3), r = a(979), s = a(962), o = a.n(s), i = a(966), c = a.n(i), l = a(963), d = a.n(l), u = a(964),
            h = a.n(u);
        n.default.use(r.a), e.a = new r.a({
            routes: [{path: "/", name: "Hello", component: o.a}, {
                path: "/profile",
                name: "ProFile",
                component: c.a
            }, {path: "/board/:boardId", name: "Board", component: d.a}, {
                path: "/project",
                name: "Project",
                component: h.a
            }]
        })
    }, 49: function (t, e) {
    }, 50: function (t, e) {
    }, 51: function (t, e) {
    }, 55: function (t, e, a) {
        function n(t) {
            a(155)
        }

        var r = a(5)(a(98), a(968), n, null, null);
        t.exports = r.exports
    }, 959: function (t, e, a) {
        var n = a(5)(a(97), a(973), null, null, null);
        t.exports = n.exports
    }, 96: function (t, e, a) {
        "use strict";
        Object.defineProperty(e, "__esModule", {value: !0});
        var n = a(3), r = {};
        e.default = {
            name: "icon", props: {
                name: {
                    type: String, validator: function (t) {
                        return t ? t in r || (n.default.util.warn('Invalid prop: prop "icon" is referring to an unregistered icon "' + t + '".\nPlesase make sure you have imported this icon before using it.', this), !1) : null
                    }
                }, scale: [Number, String], spin: Boolean, inverse: Boolean, flip: {
                    validator: function (t) {
                        return "horizontal" === t || "vertical" === t
                    }
                }, label: String
            }, data: function () {
                return {x: !1, y: !1, childrenWidth: 0, childrenHeight: 0, outerScale: 1}
            }, computed: {
                normalizedScale: function () {
                    var t = this.scale;
                    return t = void 0 === t ? 1 : Number(t), isNaN(t) || t <= 0 ? (n.default.util.warn('Invalid prop: prop "scale" should be a number over 0.', this), this.outerScale) : t * this.outerScale
                }, clazz: function () {
                    return {
                        "fa-icon": !0,
                        "fa-spin": this.spin,
                        "fa-flip-horizontal": "horizontal" === this.flip,
                        "fa-flip-vertical": "vertical" === this.flip,
                        "fa-inverse": this.inverse
                    }
                }, icon: function () {
                    return this.name ? r[this.name] : null
                }, box: function () {
                    return this.icon ? "0 0 " + this.icon.width + " " + this.icon.height : "0 0 " + this.width + " " + this.height
                }, ratio: function () {
                    if (!this.icon)return 1;
                    var t = this.icon, e = t.width, a = t.height;
                    return Math.max(e, a) / 16
                }, width: function () {
                    return this.childrenWidth || this.icon && this.icon.width / this.ratio * this.normalizedScale || 0
                }, height: function () {
                    return this.childrenHeight || this.icon && this.icon.height / this.ratio * this.normalizedScale || 0
                }, style: function () {
                    return 1 !== this.normalizedScale && {fontSize: this.normalizedScale + "em"}
                }
            }, mounted: function () {
                var t = this;
                if (!this.icon) {
                    this.$children.forEach(function (e) {
                        e.outerScale = t.normalizedScale
                    });
                    var e = 0, a = 0;
                    this.$children.forEach(function (t) {
                        e = Math.max(e, t.width), a = Math.max(a, t.height)
                    }), this.childrenWidth = e, this.childrenHeight = a, this.$children.forEach(function (t) {
                        t.x = (e - t.width) / 2, t.y = (a - t.height) / 2
                    })
                }
            }, register: function (t) {
                for (var e in t) {
                    var a = t[e];
                    a.paths || (a.paths = []), a.d && a.paths.push({d: a.d}), a.polygons || (a.polygons = []), a.points && a.polygons.push({points: a.points}), r[e] = a
                }
            }, icons: r
        }
    }, 960: function (t, e, a) {
        function n(t) {
            a(158)
        }

        var r = a(5)(a(99), a(971), n, null, null);
        t.exports = r.exports
    }, 961: function (t, e, a) {
        function n(t) {
            a(164)
        }

        var r = a(5)(a(100), a(978), n, null, null);
        t.exports = r.exports
    }, 962: function (t, e, a) {
        function n(t) {
            a(163)
        }

        var r = a(5)(a(101), a(977), n, "data-v-ede2db38", null);
        t.exports = r.exports
    }, 963: function (t, e, a) {
        function n(t) {
            a(160)
        }

        var r = a(5)(a(102), a(974), n, null, null);
        t.exports = r.exports
    }, 964: function (t, e, a) {
        function n(t) {
            a(159)
        }

        var r = a(5)(a(103), a(972), n, "data-v-46261ad5", null);
        t.exports = r.exports
    }, 965: function (t, e, a) {
        function n(t) {
            a(162)
        }

        var r = a(5)(a(104), a(976), n, null, null);
        t.exports = r.exports
    }, 966: function (t, e, a) {
        function n(t) {
            a(161)
        }

        var r = a(5)(a(105), a(975), n, "data-v-6d1d43ba", null);
        t.exports = r.exports
    }, 967: function (t, e, a) {
        function n(t) {
            a(157)
        }

        var r = a(5)(a(106), a(970), n, null, null);
        t.exports = r.exports
    }, 968: function (t, e) {
        t.exports = {
            render: function () {
                var t = this, e = t.$createElement, a = t._self._c || e;
                return a("div", {attrs: {id: "app"}}, [a("header-menu"), t._v(" "), a("router-view")], 1)
            }, staticRenderFns: []
        }
    }, 969: function (t, e) {
        t.exports = {
            render: function () {
                var t = this, e = t.$createElement, a = t._self._c || e;
                return a("svg", {
                    class: t.clazz,
                    style: t.style,
                    attrs: {
                        version: "1.1",
                        role: t.label ? "img" : "presentation",
                        "aria-label": t.label,
                        x: t.x,
                        y: t.y,
                        width: t.width,
                        height: t.height,
                        viewBox: t.box
                    }
                }, [t._t("default", [t.icon && t.icon.paths ? t._l(t.icon.paths, function (e) {
                    return a("path", t._b({}, "path", e, !1))
                }) : t._e(), t._v(" "), t.icon && t.icon.polygons ? t._l(t.icon.polygons, function (e) {
                    return a("polygon", t._b({}, "polygon", e, !1))
                }) : t._e(), t._v("\b\n    "), t.icon && t.icon.raw ? [a("g", {domProps: {innerHTML: t._s(t.icon.raw)}})] : t._e()])], 2)
            }, staticRenderFns: []
        }
    }, 97: function (t, e, a) {
        "use strict";
        Object.defineProperty(e, "__esModule", {value: !0});
        var n = a(41), r = a.n(n);
        window.Fuse = r.a, e.default = {
            data: function () {
                return {fuse: null, search: "", result: []}
            },
            props: {
                eventName: {type: String, default: "fuseResultsUpdated"},
                defaultAll: {type: Boolean, default: !0},
                list: {type: Array},
                caseSensitive: {type: Boolean, default: !1},
                includeScore: {type: Boolean, default: !1},
                includeMatches: {type: Boolean, default: !1},
                tokenize: {type: Boolean, default: !1},
                matchAllTokens: {type: Boolean, default: !1},
                findAllMatches: {type: Boolean, default: !1},
                id: {type: String, default: ""},
                shouldSort: {type: Boolean, default: !0},
                threshold: {type: Number, default: .6},
                location: {type: Number, default: 0},
                distance: {type: Number, default: 100},
                maxPatternLength: {type: Number, default: 32},
                minMatchCharLength: {type: Number, default: 1},
                keys: {type: Array}
            },
            computed: {
                options: function () {
                    var t = {
                        caseSensitive: this.caseSensitive,
                        includeScore: this.includeScore,
                        includeMatches: this.includeMatches,
                        tokenize: this.tokenize,
                        matchAllTokens: this.matchAllTokens,
                        findAllMatches: this.findAllMatches,
                        shouldSort: this.shouldSort,
                        threshold: this.threshold,
                        location: this.location,
                        distance: this.distance,
                        maxPatternLength: this.maxPatternLength,
                        minMatchCharLength: this.minMatchCharLength,
                        keys: this.keys
                    };
                    return "" !== this.id && (t.id = this.id), t
                }
            },
            watch: {
                search: function () {
                    "" === this.search.trim() ? this.defaultAll ? this.result = this.list : this.result = [] : this.result = this.fuse.search(this.search.trim())
                }, result: function () {
                    this.$parent.$emit(this.eventName, this.result)
                }
            },
            methods: {
                initFuse: function () {
                    this.fuse = new window.Fuse(this.list, this.options), this.defaultAll && (this.result = this.list)
                }
            },
            ready: function () {
                this.initFuse()
            },
            mounted: function () {
                this.initFuse()
            }
        }
    }, 970: function (t, e, a) {
        t.exports = {
            render: function () {
                var t = this, e = t.$createElement, n = t._self._c || e;
                return n("div", {staticClass: "user-info"}, [n("div", {staticClass: "container"}, [n("div", {staticClass: "info"}, [n("div", {
                    staticClass: "avatar",
                    on: {mouseover: t.onShow, mouseout: t.onHide, click: t.cardShow}
                }, [n("img", {
                    staticClass: "image",
                    attrs: {id: "img", src: t.user.userAvatar}
                }), t._v(" "), n("span", {
                    directives: [{
                        name: "show",
                        rawName: "v-show",
                        value: t.isShow,
                        expression: "isShow"
                    }], staticClass: "change", attrs: {id: "change"}
                }, [t._v("修改")])]), t._v(" "), "no" === t.isChangeInfo ? n("div", {staticClass: "user-base-info"}, [n("h3", [t._v(t._s(t.user.userAccount))]), t._v(" "), 0 === t.user.userSex ? n("p", [t._v("男")]) : t._e(), t._v(" "), 1 === t.user.userSex ? n("p", [t._v("女")]) : t._e(), t._v(" "), null === t.user.userSex ? n("p", [t._v("未填写")]) : t._e(), t._v(" "), n("p", [t._v(t._s(t.user.userEmail))]), t._v(" "), n("p", [t._v(t._s(t.user.userIntro))]), t._v(" "), n("b-button", {
                    attrs: {
                        variant: "secondary",
                        size: "sm"
                    }, on: {click: t.changeInfo}
                }, [n("icon", {attrs: {name: "pencil"}}), t._v("\n          编辑个人资料\n        ")], 1)], 1) : t._e(), t._v(" "), "yes" === t.isChangeInfo ? n("div", {staticClass: "user-base-info"}, [n("b-form", {on: {submit: t.onSubmit}}, [n("b-form-group", {
                    attrs: {
                        id: "exampleInputGroup3",
                        label: "性别:",
                        "label-for": "userSex"
                    }
                }, [n("b-form-select", {
                    attrs: {id: "userSex", options: t.sex, required: "", size: "sm"},
                    model: {
                        value: t.form.userSex, callback: function (e) {
                            t.form.userSex = e
                        }, expression: "form.userSex"
                    }
                })], 1), t._v(" "), n("b-form-group", {
                    attrs: {
                        id: "exampleInputGroup1",
                        label: "邮箱地址:",
                        "label-for": "userEmail"
                    }
                }, [n("b-form-input", {
                    attrs: {
                        id: "userEmail",
                        type: "email",
                        required: "",
                        placeholder: "请输入邮箱地址...",
                        size: "sm"
                    }, model: {
                        value: t.form.userEmail, callback: function (e) {
                            t.form.userEmail = e
                        }, expression: "form.userEmail"
                    }
                })], 1), t._v(" "), n("b-form-group", {
                    attrs: {
                        id: "textarea1",
                        label: "简介:",
                        "label-for": "userIntro"
                    }
                }, [n("b-form-textarea", {
                    attrs: {
                        id: "userIntro",
                        placeholder: "请输入简介...",
                        rows: 3,
                        "max-rows": 6,
                        required: "",
                        size: "sm"
                    }, model: {
                        value: t.form.userIntro, callback: function (e) {
                            t.form.userIntro = e
                        }, expression: "form.userIntro"
                    }
                })], 1), t._v(" "), n("b-button", {
                    attrs: {
                        type: "submit",
                        variant: "success",
                        size: "sm"
                    }
                }, [t._v("保存")]), t._v(" "), n("b-button", {
                    attrs: {
                        type: "reset",
                        variant: "primary",
                        size: "sm"
                    }
                }, [t._v("重置")]), t._v(" "), n("b-button", {
                    attrs: {variant: "secondary", size: "sm"},
                    on: {click: t.notChangeInfo}
                }, [t._v("取消")])], 1)], 1) : t._e()])]), t._v(" "), n("div", ["yes" === t.isCardShow ? n("b-card", {staticClass: "text-center b-card"}, [n("div", {
                    staticStyle: {"text-align": "left"},
                    slot: "header"
                }, [n("small", {staticStyle: {"text-align": "left"}}, [t._v("修改头像")]), t._v(" "), n("span", {
                    staticStyle: {cursor: "pointer"},
                    on: {click: t.cardHide}
                }, [n("icon", {
                    staticStyle: {float: "right"},
                    attrs: {name: "times"}
                })], 1)]), t._v(" "), n("b-form-file", {
                    attrs: {accept: ".jpg, .png", "choose-label": "上传图片"},
                    on: {
                        change: function (e) {
                            t.changeImage(e)
                        }
                    },
                    model: {
                        value: t.avatarInput, callback: function (e) {
                            t.avatarInput = e
                        }, expression: "avatarInput"
                    }
                }), t._v(" "), n("hr"), t._v(" "), n("b-button", {
                    attrs: {variant: "success", size: "sm"},
                    on: {
                        click: function (e) {
                            t.editAvatar()
                        }
                    }
                }, [n("icon", {attrs: {name: "check"}}), t._v("保存头像")], 1)], 1) : t._e()], 1), t._v(" "), n("b-card", {
                    staticStyle: {"text-align": "left"},
                    attrs: {"no-body": ""}
                }, [n("b-tabs", {
                    ref: "tabs",
                    attrs: {card: ""}
                }, [n("b-tab", {attrs: {title: "设置"}}, [n("div", {staticClass: "myTab-body"}, [n("div", {staticClass: "myTab-title"}, [n("h5", [t._v("基本信息")]), t._v(" "), n("hr")]), t._v(" "), n("b-button", {
                    staticClass: "myTab-link",
                    attrs: {variant: "link", size: "sm"},
                    on: {click: t.changePwd}
                }, [n("span", [t._v("修改密码")])]), t._v(" "), n("div", ["yes" === t.changePwdShow ? n("b-card", {staticClass: "b-card"}, [n("div", {slot: "header"}, [n("small", {staticStyle: {"text-align": "left"}}, [t._v("修改密码")]), t._v(" "), n("span", {
                    staticStyle: {cursor: "pointer"},
                    on: {click: t.changePwdHide}
                }, [n("icon", {
                    staticStyle: {float: "right"},
                    attrs: {name: "times"}
                })], 1)]), t._v(" "), n("b-form", {on: {submit: t.onPwdSubmit}}, [n("b-form-group", {
                    attrs: {
                        id: "oldPwd",
                        label: "原密码:",
                        "label-for": "oldPwd"
                    }
                }, [n("b-form-input", {
                    attrs: {
                        id: "oldPwd",
                        type: "password",
                        required: "",
                        placeholder: "请输入原密码...",
                        size: "sm"
                    }, model: {
                        value: t.form2.oldPwd, callback: function (e) {
                            t.form2.oldPwd = e
                        }, expression: "form2.oldPwd"
                    }
                })], 1), t._v(" "), n("b-form-group", {
                    attrs: {
                        id: "newPwd",
                        label: "新密码:",
                        "label-for": "newPwd"
                    }
                }, [n("b-form-input", {
                    attrs: {
                        id: "newPwd",
                        type: "password",
                        required: "",
                        placeholder: "请输入新密码...",
                        size: "sm"
                    }, model: {
                        value: t.form2.newPwd, callback: function (e) {
                            t.form2.newPwd = e
                        }, expression: "form2.newPwd"
                    }
                })], 1), t._v(" "), n("b-form-group", {
                    attrs: {
                        id: "newPwdConfirm",
                        label: "确认新密码:",
                        "label-for": "newPwdConfirm"
                    }
                }, [n("b-form-input", {
                    attrs: {
                        id: "newPwdConfirm",
                        type: "password",
                        required: "",
                        placeholder: "请输入确认新密码...",
                        size: "sm"
                    }, model: {
                        value: t.form2.newPwdConfirm, callback: function (e) {
                            t.form2.newPwdConfirm = e
                        }, expression: "form2.newPwdConfirm"
                    }
                })], 1), t._v(" "), n("b-button", {
                    attrs: {
                        type: "submit",
                        variant: "success",
                        size: "sm"
                    }
                }, [t._v("确认")]), t._v(" "), n("b-button", {
                    attrs: {variant: "secondary", size: "sm"},
                    on: {click: t.changePwdHide}
                }, [t._v("关闭")])], 1)], 1) : t._e()], 1)], 1), t._v(" "), n("div", {staticClass: "myTab-body"}, [n("div", {staticClass: "myTab-title"}, [n("h5", [t._v("登录账号")]), t._v(" "), n("hr")]), t._v(" "), n("b-card", {
                    staticClass: "text-center",
                    staticStyle: {width: "40%"},
                    attrs: {header: "主邮箱", "bg-variant": "light"}
                }, [n("p", {staticClass: "card-text"}, [t._v(t._s(t.user.userEmail))])]), t._v(" "), n("b-button", {
                    staticStyle: {
                        "margin-top": "30px",
                        "margin-left": "5px"
                    }, attrs: {variant: "secondary", size: "sm"}
                }, [t._v("\n            添加备用邮箱\n          ")])], 1), t._v(" "), n("div", {staticClass: "myTab-body"}, [n("div", {staticClass: "myTab-title"}, [n("h5", [t._v("通知")]), t._v(" "), n("hr")]), t._v(" "), n("b-button", {
                    staticClass: "myTab-link",
                    attrs: {variant: "link", size: "sm"}
                }, [n("span", [t._v("开启/关闭邮件提醒")])])], 1)]), t._v(" "), n("b-tab", {attrs: {title: "第三方账号"}}, [n("div", {staticClass: "myTab-body"}, [n("div", {staticClass: "myTab-title"}, [n("h5", [t._v("赞助SixTeam团队")]), t._v(" "), n("hr")]), t._v(" "), n("div", {staticClass: "myTab-text"}, [n("img", {
                    staticClass: "myTab-img",
                    attrs: {src: a(171)}
                }), t._v(" "), n("b", {staticClass: "myTab-b"}, [t._v("个人收款账号")])]), t._v(" "), n("div", {staticClass: "myTab-text2"}, [n("p", [t._v("谢谢您的支持，我们SixTeam会继续努力，做到最好！")])])])]), t._v(" "), n("b-tab", {attrs: {title: "通讯录"}}, [n("div", {staticClass: "myTab-body"}, ["no" == t.addFriendShow ? n("div", {
                    staticClass: "myTab-title",
                    staticStyle: {"text-align": "right"}
                }, [n("b-button", {
                    attrs: {variant: "secondary", size: "sm"},
                    on: {click: t.showAddFriend}
                }, [t._v("\n              添加好友\n            ")]), t._v(" "), n("hr")], 1) : t._e(), t._v(" "), "yes" == t.addFriendShow ? n("div", {staticStyle: {"text-align": "right"}}, [n("b-form-input", {
                    staticStyle: {
                        width: "200px",
                        display: "inline"
                    },
                    attrs: {size: "sm", type: "text", placeholder: "输入账号"},
                    model: {
                        value: t.addFriendMsg.friendAccount, callback: function (e) {
                            t.addFriendMsg.friendAccount = e
                        }, expression: "addFriendMsg.friendAccount"
                    }
                }), t._v(" "), n("b-button", {
                    attrs: {variant: "success", size: "sm"},
                    on: {click: t.addFriend}
                }, [t._v("添加")]), t._v(" "), n("hr")], 1) : t._e(), t._v(" "), t._l(t.friends, function (e) {
                    return n("div", [n("div", {staticClass: "myTab-friend"}, [n("div", {staticClass: "myTab-avatar"}, [n("span", [n("img", {attrs: {src: e.avatar}})])]), t._v(" "), n("div", {staticStyle: {"text-align": "left"}}, [n("p", {staticClass: "myTab-avatar-p"}, [t._v(t._s(e.name))]), t._v(" "), n("p", [t._v(t._s(e.email))])])]), t._v(" "), n("div", {staticStyle: {float: "right"}}, [n("b-button", {
                        attrs: {
                            variant: "danger",
                            size: "sm"
                        }, on: {
                            click: function (a) {
                                t.deleteFriend(e.name)
                            }
                        }
                    }, [t._v("\n                删除\n              ")])], 1), t._v(" "), n("hr")])
                })], 2)])], 1)], 1)], 1)
            }, staticRenderFns: []
        }
    }, 971: function (t, e, a) {
        t.exports = {
            render: function () {
                var t = this, e = t.$createElement, n = t._self._c || e;
                return n("b-navbar", {
                    staticStyle: {"background-color": "rgba(0,0,0,0.15)"},
                    attrs: {toggleable: "md", type: "dark", sticky: t.isSticky}
                }, [n("b-nav-toggle", {attrs: {target: "nav_collapse"}}), t._v(" "), n("b-navbar-brand", {attrs: {to: "/"}}, [n("img", {
                    attrs: {
                        src: a(172),
                        height: "34px",
                        width: "130px"
                    }
                })]), t._v(" "), n("b-nav-form", [n("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.term,
                        expression: "term"
                    }], attrs: {type: "text", id: "header-search"}, domProps: {value: t.term}, on: {
                        input: function (e) {
                            e.target.composing || (t.term = e.target.value)
                        }
                    }
                }), t._v(" "), n("icon", {
                    staticStyle: {color: "white", position: "relative", left: "-25px", cursor: "pointer"},
                    attrs: {name: "search", scale: "1.2"}
                })], 1), t._v(" "), n("ul", {staticClass: "header-center"}, [n("li", [n("a", {
                    staticClass: "btn btn-default",
                    attrs: {href: "https://www.leangoo.com/event.html", target: "_blank"}
                }, [t._v("活动")])]), t._v(" "), n("li", [n("a", {
                    staticClass: "btn btn-default",
                    attrs: {href: "https://www.leangoo.com/category/%E6%96%87%E7%AB%A0", target: "_blank"}
                }, [t._v("文章")])]), t._v(" "), n("li", [n("a", {
                    staticClass: "btn btn-default",
                    attrs: {href: "http://www.scrumcn.com/agile/", target: "_blank"}
                }, [t._v("课程")])])]), t._v(" "), n("b-nav", {
                    staticClass: "ml-auto",
                    attrs: {"is-nav-bar": ""}
                }, [n("b-nav-item-dropdown", {
                    attrs: {
                        right: "",
                        variant: "defalut",
                        size: "sm",
                        "no-caret": t.no_caret
                    }
                }, [n("template", {slot: "button-content"}, [n("icon", {
                    attrs: {
                        name: "plus",
                        scale: "1",
                        size: "sm"
                    }
                })], 1), t._v(" "), n("div", {staticClass: "newButton"}, [n("div", {
                    staticStyle: {
                        "border-bottom": "1px rgb(140,140,140) inset",
                        "background-color": "#F5F5F5"
                    }
                }, [n("h5", {staticClass: "text-center"}, [t._v("新建")])]), t._v(" "), n("span", [t._v("新建看板")]), t._v(" "), n("p", [t._v("一个看板包括多个列表,每个列表包括多个任务卡片,团队通过看板共享任务,在线实时协作")]), t._v(" "), n("span", [t._v("新建项目")]), t._v(" "), n("p", [t._v("一个项目包括多个看板和多名项目成员,通过项目可以对看板进行分组管理,更好的实现项目协作")])])], 2), t._v(" "), n("b-button-group", {
                    staticStyle: {"margin-right": "3px"},
                    attrs: {size: "sm"}
                }, [n("b-button", {attrs: {variant: "default", size: "sm"}}, [n("icon", {
                    attrs: {
                        name: "bars",
                        scale: "1"
                    }
                })], 1), t._v(" "), n("b-nav-item-dropdown", {
                    attrs: {
                        right: "",
                        variant: "default",
                        size: "sm"
                    }
                }, [n("template", {slot: "button-content"}, [t._v("\n        看板导航")]), t._v(" "), n("menu-board")], 2)], 1), t._v(" "), n("b-button-group", [n("img", {
                    attrs: {
                        src: a(170),
                        width: "32px",
                        height: "32px"
                    }
                }), t._v(" "), n("b-nav-item-dropdown", {
                    attrs: {
                        right: "",
                        variant: "default",
                        size: "sm",
                        "no-caret": t.no_caret
                    }
                }, [n("template", {slot: "button-content"}, [t._v("\n          " + t._s(t.userAccount) + "\n        ")]), t._v(" "), n("b-dropdown-item", {
                    attrs: {
                        href: "#",
                        to: "/profile"
                    }
                }, [t._v("用户中心")]), t._v(" "), n("b-dropdown-item", {attrs: {href: "#"}}, [t._v("常用快捷操作")]), t._v(" "), n("b-dropdown-divider"), t._v(" "), n("b-dropdown-item", {attrs: {href: "#"}}, [t._v("意见反馈")]), t._v(" "), n("b-dropdown-item", {attrs: {href: "#"}}, [t._v("版本更新")]), t._v(" "), n("b-dropdown-item", {attrs: {href: "#"}}, [t._v("返回首页")]), t._v(" "), n("b-dropdown-divider"), t._v(" "), n("b-dropdown-item", {attrs: {href: "#"}}, [t._v("退出 ")])], 2)], 1)], 1)], 1)
            }, staticRenderFns: []
        }
    }, 972: function (t, e) {
        t.exports = {
            render: function () {
                var t = this, e = t.$createElement, a = t._self._c || e;
                return a("div", {
                    staticClass: "profile_content",
                    staticStyle: {overflow: "auto"}
                }, [a("project-manage")], 1)
            }, staticRenderFns: []
        }
    }, 973: function (t, e) {
        t.exports = {
            render: function () {
                var t = this, e = t.$createElement;
                return (t._self._c || e)("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.search,
                        expression: "search"
                    }], attrs: {type: "search"}, domProps: {value: t.search}, on: {
                        input: function (e) {
                            e.target.composing || (t.search = e.target.value)
                        }
                    }
                })
            }, staticRenderFns: []
        }
    }, 974: function (t, e) {
        t.exports = {
            render: function () {
                var t = this, e = t.$createElement, a = t._self._c || e;
                return a("div", {staticClass: "board_content"}, [a("b-navbar", {
                    staticStyle: {"background-color": "rgb(14,116,175)"},
                    attrs: {toggleable: "md", type: "dark"}
                }, [a("b-navbar-brand", {attrs: {href: "#"}}, [t._v(t._s(t.boardName))]), t._v(" "), a("b-nav", {attrs: {"is-nav-bar": ""}}, [a("b-button-toolbar", [a("b-button-group", {
                    staticClass: "mx-1",
                    attrs: {size: "sm"}
                }, [a("b-dropdown", {
                    staticClass: "nav-button-drown",
                    attrs: {variant: "default", size: "sm", "popper-opts": {dataObject: {"data.hide": t.showData}}}
                }, [a("template", {slot: "button-content"}, [t._v("\n             " + t._s(t._f("formatDate")(t.startDate)) + "-" + t._s(t._f("formatDate")(t.endDate)) + "\n            ")]), t._v(" "), a("b-card", {
                    staticStyle: {
                        width: "250px",
                        border: "none"
                    }, attrs: {"no-body": ""}
                }, [a("b-card-header", {
                    staticStyle: {
                        "font-size": "14px",
                        padding: "10px,15px"
                    }
                }, [t._v("\n                设置看板周期\n              ")]), t._v(" "), a("b-card-body", [a("span", {staticClass: "time-zone"}, [t._v("时区 GMT +8:00")]), t._v(" "), a("el-date-picker", {
                    attrs: {
                        type: "date",
                        placeholder: "开始日期",
                        size: "small"
                    }, model: {
                        value: t.startDate, callback: function (e) {
                            t.startDate = e
                        }, expression: "startDate"
                    }
                }), t._v(" "), a("el-date-picker", {
                    staticStyle: {"margin-top": "10px"},
                    attrs: {type: "date", placeholder: "结束日期", size: "small"},
                    model: {
                        value: t.endDate, callback: function (e) {
                            t.endDate = e
                        }, expression: "endDate"
                    }
                })], 1), t._v(" "), a("b-card-footer", [a("b-btn", {
                    staticStyle: {cursor: "pointer"},
                    attrs: {variant: "success", size: "sm"}
                }, [t._v("保存")]), t._v(" "), a("b-btn", {
                    staticStyle: {cursor: "pointer"},
                    attrs: {variant: "default", size: "sm"},
                    on: {
                        click: function (e) {
                            t.cancelDate(e)
                        }
                    }
                }, [t._v("取消")])], 1)], 1)], 2)], 1), t._v(" "), a("b-button-group", {
                    staticClass: "mx-1",
                    staticStyle: {height: "32px"},
                    attrs: {size: "sm"}
                }, [a("b-btn", {
                    staticClass: "nav-button",
                    attrs: {variant: "default"}
                }, [a("icon", {attrs: {name: "area-chart"}})], 1), t._v(" "), a("b-btn", {
                    staticClass: "nav-button",
                    attrs: {variant: "default"}
                }, [a("icon", {attrs: {name: "table"}})], 1), t._v(" "), a("b-btn", {
                    staticClass: "nav-button",
                    attrs: {variant: "default"}
                }, [a("icon", {
                    staticStyle: {"padding-top": "2px"},
                    attrs: {name: "group"}
                }), t._v("项目成员可见")], 1), t._v(" "), a("b-btn", {
                    staticClass: "nav-button",
                    attrs: {variant: "default"}
                }, [a("icon", {
                    staticStyle: {"padding-top": "2px"},
                    attrs: {name: "plus"}
                }), t._v("新建列表\n          ")], 1)], 1)], 1)], 1), t._v(" "), a("b-nav", {
                    staticClass: "ml-auto",
                    attrs: {"is-nav-bar": ""}
                }, [a("b-button-group", {staticStyle: {height: "32px"}, attrs: {size: "sm"}}, [a("b-btn", {
                    staticClass: "ml-3",
                    staticStyle: {"background-color": "#0E74AF"},
                    attrs: {variant: "default"},
                    on: {
                        click: function (e) {
                            t.right = 0
                        }
                    }
                }, [a("icon", {
                    staticStyle: {"padding-top": "2px"},
                    attrs: {name: "user"}
                }), t._v("成员")], 1), t._v(" "), a("b-btn", {
                    staticClass: "ml-3",
                    staticStyle: {"background-color": "#0E74AF"},
                    attrs: {variant: "default"},
                    on: {
                        click: function (e) {
                            t.right = 0
                        }
                    }
                }, [a("icon", {
                    staticStyle: {"padding-top": "2px"},
                    attrs: {name: "filter"}
                }), t._v("筛选")], 1), t._v(" "), a("b-btn", {
                    staticClass: "ml-3",
                    staticStyle: {"background-color": "#0E74AF"},
                    attrs: {variant: "default"},
                    on: {
                        click: function (e) {
                            t.right = 0
                        }
                    }
                }, [a("icon", {
                    staticStyle: {"padding-top": "2px"},
                    attrs: {name: "bars"}
                }), t._v("菜单")], 1)], 1), t._v(" "), a("div", {
                    staticClass: "slider-menu pull-right",
                    style: {right: t.right + "px", height: t.height + "px"}
                }, [a("div", {
                    staticClass: "slider-menu-close", on: {
                        click: function (e) {
                            t.right = -300
                        }
                    }
                }, [a("icon", {
                    staticStyle: {"padding-top": "5px"},
                    attrs: {name: "chevron-right", scale: "1.5"}
                })], 1)])], 1)], 1), t._v(" "), a("div", {
                    staticClass: "board_content_main",
                    staticStyle: {"margin-left": "20px", "font-size": "14px"}
                }, [a("draggable", {
                    staticClass: "card-deck",
                    staticStyle: {"align-items": "flex-start"},
                    attrs: {options: {ghostClass: "ghost", animation: 0, group: "dragList", handle: ".list-title"}},
                    model: {
                        value: t.List, callback: function (e) {
                            t.List = e
                        }, expression: "List"
                    }
                }, t._l(t.List, function (e, n) {
                    return a("b-card", {
                        key: n,
                        staticClass: "ml-1",
                        staticStyle: {"max-width": "260px", "background-color": "#eeeeee", "margin-left": "1px"},
                        attrs: {"no-body": ""}
                    }, [a("b-card-header", {staticClass: "list-title"}, [t._v("\n          " + t._s(e.listName) + "\n          "), a("b-badge", {attrs: {variant: "success"}}, [t._v(t._s(e.cardList.length))]), t._v(" "), a("b-dd", {
                        staticClass: "float-right list-title-menu",
                        staticStyle: {"background-color": "#e7e7e7"},
                        attrs: {size: "sm", variant: "default"}
                    }, [a("template", {slot: "button-content"}, [a("icon", {attrs: {name: "bars"}})], 1), t._v(" "), a("b-dropdown-item", [t._v("复制列表")]), t._v(" "), a("b-dropdown-item", [t._v("创建引用")]), t._v(" "), a("b-dropdown-item", {
                        on: {
                            click: function (e) {
                                t.delList(n)
                            }
                        }
                    }, [t._v("删除列表")])], 2)], 1), t._v(" "), a("div", {
                        staticClass: "card-text",
                        staticStyle: {"background-color": "#eeeeee"}
                    }, [a("draggable", {
                        staticStyle: {"min-height": "30px", "max-height": "300px", overflow: "auto"},
                        attrs: {options: {ghostClass: "ghost", animation: 0, group: "description"}, move: t.onMove},
                        on: {update: t.datadragEnd, end: t.dragEnd},
                        model: {
                            value: e.cardList, callback: function (t) {
                                e.cardList = t
                            }, expression: "item.cardList"
                        }
                    }, t._l(e.cardList, function (e, r) {
                        return a("div", {
                            key: r,
                            staticClass: "task_view btn btn-default",
                            staticStyle: {"min-height": "30px"},
                            on: {
                                mouseover: function (e) {
                                    if (e.target !== e.currentTarget)return null;
                                    t.showEditAndDelete(e)
                                }, mouseout: function (e) {
                                    if (e.target !== e.currentTarget)return null;
                                    t.hideEditAndDelete(e)
                                }
                            }
                        }, [a("div", {
                            staticClass: "edit-and-delete-card",
                            staticStyle: {display: "block"},
                            on: {
                                mouseover: function (e) {
                                    if (e.target !== e.currentTarget)return null;
                                    t.showEditDiv(e)
                                }
                            }
                        }, [a("span", {staticStyle: {cursor: "pointer"}}, [a("icon", {attrs: {name: "pencil"}})], 1), t._v(" "), a("span", {
                            staticStyle: {cursor: "pointer"},
                            on: {
                                click: function (e) {
                                    e.stopPropagation(), t.delCard(n, r)
                                }
                            }
                        }, [a("icon", {attrs: {name: "trash"}})], 1)]), t._v(" "), a("div", {
                            staticClass: "task-name-content",
                            staticStyle: {"background-color": "#EEEEEE"}
                        }, [a("span", {staticClass: "card-name pull-left"}, [t._v(t._s(e.cardName))])])])
                    }))], 1), t._v(" "), a("b-card-footer", {
                        staticClass: "list-footer",
                        staticStyle: {border: "none", height: "auto"}
                    }, [a("b-btn", {
                        staticClass: "add-card-button float-left",
                        staticStyle: {display: "block"},
                        attrs: {size: "sm", variant: "link"},
                        on: {
                            click: function (e) {
                                t.addCard(e, n)
                            }
                        }
                    }, [t._v("添加卡片")]), t._v(" "), a("div", {staticStyle: {display: "none"}}, [a("b-form-textarea", {
                        staticStyle: {
                            margin: "3px auto",
                            width: "98%"
                        }, attrs: {rows: 2, "max-rows": 2}, model: {
                            value: t.nCardName, callback: function (e) {
                                t.nCardName = e
                            }, expression: "nCardName"
                        }
                    }), t._v(" "), a("b-btn", {
                        staticClass: "float-left",
                        staticStyle: {cursor: "pointer"},
                        attrs: {size: "sm", variant: "success"},
                        on: {
                            click: function (e) {
                                t.saveCard(e, n)
                            }
                        }
                    }, [t._v("保存")]), t._v(" "), a("b-btn", {
                        staticClass: "float-left ml-1",
                        staticStyle: {cursor: "pointer"},
                        attrs: {size: "sm", variant: "default"},
                        on: {
                            click: function (e) {
                                t.cancelSave(e)
                            }
                        }
                    }, [t._v("取消")])], 1)], 1)], 1)
                })), t._v(" "), a("div", [a("ul", t._l(t.List, function (e, n) {
                    return a("li", {key: n}, [t._v("\n          " + t._s(e.cardList.length) + "\n        ")])
                }))])], 1)], 1)
            }, staticRenderFns: []
        }
    }, 975: function (t, e) {
        t.exports = {
            render: function () {
                var t = this, e = t.$createElement, a = t._self._c || e;
                return a("div", {staticClass: "profile_content", staticStyle: {overflow: "auto"}}, [a("user-info")], 1)
            }, staticRenderFns: []
        }
    }, 976: function (t, e, a) {
        t.exports = {
            render: function () {
                var t = this, e = t.$createElement, a = t._self._c || e;
                return a("div", {staticClass: "user-info"}, [a("div", {staticClass: "container"}, [a("div", {staticClass: "info"}, [t._m(0), t._v(" "), "no" === t.isChangeInfo ? a("div", {staticClass: "user-base-info"}, [a("h3", [t._v(t._s(t.project.projectName))]), t._v(" "), a("p", [t._v(t._s(t.project.projectIntro))]), t._v(" "), a("b-button", {
                    attrs: {
                        variant: "secondary",
                        size: "sm"
                    }, on: {click: t.changeInfo}
                }, [a("icon", {attrs: {name: "pencil"}}), t._v("\n          编辑项目资料\n        ")], 1)], 1) : t._e(), t._v(" "), "yes" === t.isChangeInfo ? a("div", {staticClass: "user-base-info"}, [a("b-form", {on: {submit: t.onSubmit}}, [a("b-form-group", {
                    attrs: {
                        id: "exampleInputGroup1",
                        label: "名称:",
                        "label-for": "projectName"
                    }
                }, [a("b-form-input", {
                    attrs: {
                        id: "projectName",
                        type: "text",
                        required: "",
                        placeholder: "请输入项目名称...",
                        size: "sm"
                    }, model: {
                        value: t.form.projectName, callback: function (e) {
                            t.form.projectName = e
                        }, expression: "form.projectName"
                    }
                })], 1), t._v(" "), a("b-form-group", {
                    attrs: {
                        id: "textarea1",
                        label: "简介:",
                        "label-for": "projectIntro"
                    }
                }, [a("b-form-textarea", {
                    attrs: {
                        id: "projectIntro",
                        placeholder: "请输入简介...",
                        rows: 3,
                        "max-rows": 6,
                        required: "",
                        size: "sm"
                    }, model: {
                        value: t.form.projectIntro, callback: function (e) {
                            t.form.projectIntro = e
                        }, expression: "form.projectIntro"
                    }
                })], 1), t._v(" "), a("b-button", {
                    attrs: {
                        type: "submit",
                        variant: "success",
                        size: "sm"
                    }
                }, [t._v("保存")]), t._v(" "), a("b-button", {
                    attrs: {
                        type: "reset",
                        variant: "primary",
                        size: "sm"
                    }
                }, [t._v("重置")]), t._v(" "), a("b-button", {
                    attrs: {variant: "secondary", size: "sm"},
                    on: {click: t.notChangeInfo}
                }, [t._v("取消")])], 1)], 1) : t._e()])]), t._v(" "), a("b-card", {
                    staticStyle: {"text-align": "center"},
                    attrs: {"no-body": ""}
                }, [a("b-tabs", {
                    ref: "tabs",
                    attrs: {card: "", id: "project-card-tab"}
                }, [a("b-tab", {attrs: {title: "看板"}}, [a("div", {
                    staticStyle: {
                        "margin-left": "15%",
                        "margin-right": "15%"
                    }
                }, [a("b-button", {
                    staticClass: "project-board",
                    attrs: {variant: "secondary"}
                }, [t._v("新建看板")]), t._v(" "), t._l(t.boards, function (e) {
                    return a("div", [a("b-button", {
                        staticClass: "project-board",
                        attrs: {variant: "primary"},
                        on: {
                            click: function (a) {
                                t.boardClick(e.boardId)
                            }
                        }
                    }, [t._v(t._s(e.boardName))])], 1)
                })], 2)]), t._v(" "), a("b-tab", {attrs: {title: "成员"}}, [a("div", {staticClass: "myTab-body"}, ["no" == t.addLeaguerShow ? a("div", {
                    staticClass: "myTab-title",
                    staticStyle: {"text-align": "right"}
                }, [a("b-button", {
                    attrs: {variant: "secondary", size: "sm"},
                    on: {click: t.showAddLeaguer}
                }, [t._v("\n              添加成员\n            ")]), t._v(" "), a("hr")], 1) : t._e(), t._v(" "), "yes" == t.addLeaguerShow ? a("div", {
                    staticClass: "myTab-title",
                    staticStyle: {"text-align": "right"}
                }, [a("b-form-input", {
                    staticStyle: {width: "200px", display: "inline"},
                    attrs: {size: "sm", type: "text", placeholder: "输入账号"},
                    model: {
                        value: t.addLeaguerMsg.leaguerAccount, callback: function (e) {
                            t.addLeaguerMsg.leaguerAccount = e
                        }, expression: "addLeaguerMsg.leaguerAccount"
                    }
                }), t._v(" "), a("b-button", {
                    attrs: {variant: "success", size: "sm"},
                    on: {click: t.addLeaguer}
                }, [t._v("添加")]), t._v(" "), a("hr")], 1) : t._e(), t._v(" "), t._l(t.leaguers, function (e) {
                    return a("div", [a("div", {staticClass: "myTab-leaguer"}, [a("div", {staticClass: "myTab-avatar"}, [a("span", [a("img", {attrs: {src: e.userAvatar}})])]), t._v(" "), a("div", {staticStyle: {"text-align": "left"}}, [a("p", {staticClass: "myTab-avatar-p"}, [t._v(t._s(e.userAccount))]), t._v(" "), a("p", [t._v(t._s(e.userEmail))])])]), t._v(" "), a("div", {staticStyle: {float: "right"}}, [a("div", {
                        staticStyle: {
                            width: "120px",
                            display: "inline-block"
                        }, on: {
                            change: function (a) {
                                t.updateRole(e.userAccount, e.roleId)
                            }
                        }
                    }, [a("b-form-select", {
                        attrs: {id: "role", options: t.role, required: "", size: ""},
                        model: {
                            value: e.roleId, callback: function (t) {
                                e.roleId = t
                            }, expression: "leaguer.roleId"
                        }
                    })], 1), t._v(" "), a("b-button", {
                        attrs: {variant: "danger", size: ""}, on: {
                            click: function (a) {
                                t.deleteLeaguer(e.userAccount)
                            }
                        }
                    }, [t._v("\n                删除\n              ")])], 1), t._v(" "), a("hr")])
                })], 2)]), t._v(" "), a("b-tab", {attrs: {title: "统计"}}, [t._v("\n        尚且无法统计，团队日夜加班紧急开发中...\n      ")]), t._v(" "), a("b-tab", {attrs: {title: "设置"}}, [a("div", {staticClass: "myTab-body"}, [a("div", {staticClass: "myTab-title"}, [a("h5", [t._v("项目归档")]), t._v(" "), a("hr")]), t._v(" "), a("div", {staticClass: "myTab-text2"}, [t._v("\n            项目管理员可以通过右边的归档按钮对项目进行归档操作。\n            "), a("b-button", {
                    staticStyle: {float: "right"},
                    attrs: {size: "sm"},
                    on: {
                        click: function (e) {
                            t.projectArchive(t.project.projectId)
                        }
                    }
                }, [t._v("归档")])], 1)])])], 1)], 1)], 1)
            }, staticRenderFns: [function () {
                var t = this, e = t.$createElement, n = t._self._c || e;
                return n("div", {staticClass: "avatar"}, [n("img", {
                    staticClass: "image",
                    attrs: {id: "img", src: a(169)}
                })])
            }]
        }
    }, 977: function (t, e) {
        t.exports = {
            render: function () {
                var t = this, e = t.$createElement, a = t._self._c || e;
                return a("div", {staticClass: "main-div"}, [a("div", {staticClass: "boardList-section"}, [a("div", {staticClass: "board_category"}, [a("b-button-toolbar", [a("icon", {attrs: {name: "user"}}), t._v(" "), a("h6", {staticStyle: {"padding-left": "15px"}}, [t._v("个人看板")]), t._v(" "), a("b-button-group", {
                    staticClass: "button-group1 mx-3",
                    attrs: {size: "sm"}
                }, [a("b-button", {
                    attrs: {variant: "info"}, on: {
                        click: function (e) {
                            t.OrderByFlag = "boardStartDate"
                        }
                    }
                }, [t._v("时间")]), t._v(" "), a("b-button", {
                    attrs: {variant: "info"}, on: {
                        click: function (e) {
                            t.OrderByFlag = "boardName"
                        }
                    }
                }, [t._v("名称")]), t._v(" "), a("b-button", {
                    attrs: {variant: "info"}, on: {
                        click: function (e) {
                            t.OrderByFlag = ""
                        }
                    }
                }, [t._v("自定义")])], 1), t._v(" "), a("b-button", {
                    directives: [{
                        name: "b-toggle",
                        rawName: "v-b-toggle.collapse1",
                        modifiers: {collapse1: !0}
                    }],
                    staticStyle: {"background-color": "rgba(255, 255, 255, 0.3)"},
                    attrs: {variant: "info", size: "sm"},
                    on: {click: t.showCollapse}
                }, [a("icon", {attrs: {name: t.icon}})], 1)], 1), t._v(" "), a("b-collapse", {
                    attrs: {
                        id: "collapse1",
                        "no-body": ""
                    }
                }, [a("b-card", [a("div", {staticClass: "card-text"}, [a("b-card", {
                    staticClass: "text-center mb-4 ignore-elements",
                    staticStyle: {
                        "background-color": "#4A97C3",
                        height: "90px",
                        "max-width": "270px",
                        cursor: "pointer",
                        "min-width": "270px"
                    },
                    attrs: {"text-variant": "white", "no-body": "", "border-variant": "none", name: "new"}
                }, [a("div", {staticClass: "card-text"}, [a("span", {
                    staticStyle: {
                        "font-size": "16px",
                        "line-height": "90px"
                    }
                }, [t._v("新建面板")])])]), t._v(" "), a("draggable", {
                    staticClass: "card-deck",
                    attrs: {move: t.checkMove, options: t.dragOptions},
                    on: {update: t.datadragEnd},
                    model: {
                        value: t.personalBoard, callback: function (e) {
                            t.personalBoard = e
                        }, expression: "personalBoard"
                    }
                }, t._l(t.SortPersonalBoard, function (e, n) {
                    return a("b-card", {
                        key: n,
                        staticClass: "text-center mb-4",
                        staticStyle: {
                            "background-color": "#DFECF4",
                            height: "90px",
                            "max-width": "270px",
                            cursor: "pointer",
                            "min-width": "270px"
                        },
                        attrs: {"text-variant": "white", "no-body": "", "border-variant": "none"},
                        on: {
                            click: function (a) {
                                t.router(e.boardId)
                            }
                        }
                    }, [a("div", {
                        staticClass: "card-text",
                        staticStyle: {color: "rgb(85,85,85)"}
                    }, [a("span", {
                        staticStyle: {
                            "font-size": "16px",
                            "line-height": "90px"
                        }
                    }, [t._v(t._s(e.boardName))])])])
                }))], 1)])], 1)], 1)]), t._v(" "), t._l(t.searchResult, function (e, n) {
                    return a("div", {
                        key: n,
                        staticClass: "project-section mt-2"
                    }, [a("div", {staticClass: "board_category"}, [a("b-button-toolbar", [a("icon", {attrs: {name: "cubes"}}), t._v(" "), a("h6", {staticStyle: {"padding-left": "15px"}}, [t._v(t._s(e.projectName))]), t._v(" "), a("b-button-group", {
                        staticClass: "button-group1 mx-3",
                        attrs: {size: "sm"}
                    }, [a("b-button", {attrs: {variant: "info"}}, [t._v("项目成员")]), t._v(" "), a("b-button", {attrs: {variant: "info"}}, [t._v("项目统计")]), t._v(" "), a("b-button", {attrs: {variant: "info"}}, [t._v("置顶")])], 1), t._v(" "), a("b-button", {
                        directives: [{
                            name: "b-toggle",
                            rawName: "v-b-toggle",
                            value: "collapes" + n,
                            expression: "'collapes'+index"
                        }],
                        staticStyle: {"background-color": "rgba(255, 255, 255, 0.3)"},
                        attrs: {variant: "info", size: "sm"}
                    }, [a("icon", {attrs: {name: t.icon}})], 1)], 1), t._v(" "), a("b-collapse", {
                        staticClass: "coll",
                        attrs: {"no-body": "", id: "collapes" + n}
                    }, [a("b-card", [a("div", {staticClass: "card-text"}, [a("b-card", {
                        staticClass: "text-center mb-4 ignore-elements",
                        staticStyle: {
                            "background-color": "#4A97C3",
                            height: "90px",
                            "max-width": "270px",
                            cursor: "pointer",
                            "min-width": "270px"
                        },
                        attrs: {"text-variant": "white", "no-body": "", "border-variant": "none", name: "new"}
                    }, [a("div", {staticClass: "card-text"}, [a("span", {
                        staticStyle: {
                            "font-size": "16px",
                            "line-height": "90px"
                        }
                    }, [t._v("新建面板")])])]), t._v(" "), a("draggable", {
                        staticClass: "card-deck",
                        attrs: {move: t.checkMove},
                        model: {
                            value: e.boardList, callback: function (t) {
                                e.boardList = t
                            }, expression: "Project.boardList"
                        }
                    }, t._l(e.boardList, function (e, n) {
                        return a("b-card", {
                            key: n,
                            staticClass: "text-center mb-4",
                            staticStyle: {
                                "background-color": "#DFECF4",
                                height: "90px",
                                "max-width": "270px",
                                cursor: "pointer",
                                "min-width": "270px"
                            },
                            attrs: {"text-variant": "white", "no-body": "", "border-variant": "none"},
                            on: {
                                click: function (a) {
                                    t.router(e.boardId)
                                }
                            }
                        }, [a("div", {
                            staticClass: "card-text",
                            staticStyle: {color: "rgb(85,85,85)"}
                        }, [a("span", {
                            staticStyle: {
                                "font-size": "16px",
                                "line-height": "90px"
                            }
                        }, [t._v(t._s(e.boardName))])])])
                    }))], 1)])], 1)], 1)])
                }), t._v(" "), a("div", {staticClass: "archive-category"}, [a("ul", [a("li", [a("a", {
                    directives: [{
                        name: "b-modal",
                        rawName: "v-b-modal.modal1",
                        modifiers: {modal1: !0}
                    }], attrs: {href: "#"}
                }, [t._v("查看已归档看板")])]), t._v(" "), a("li", [a("a", {
                    directives: [{
                        name: "b-modal",
                        rawName: "v-b-modal.modal2",
                        modifiers: {modal2: !0}
                    }], attrs: {href: "#"}
                }, [t._v("查看已归档项目")])])])]), t._v(" "), a("b-modal", {
                    ref: "modal1",
                    staticStyle: {color: "black"},
                    attrs: {id: "modal1", title: "已归档看板", "hide-footer": !0}
                }, [a("table", {
                    staticClass: "table table-hover",
                    staticStyle: {"font-size": "14px"}
                }, [a("tbody", t._l(t.archiveBoardList, function (e, n) {
                    return a("tr", {key: n}, [a("td", [t._v(t._s(e.boardName))]), t._v(" "), a("td", [a("a", {attrs: {href: "#"}}, [t._v("撤销归档")]), t._v("   "), a("a", {
                        staticStyle: {color: "red"},
                        attrs: {href: "#"}
                    }, [t._v("彻底删除")])])])
                }))])]), t._v(" "), a("b-modal", {
                    ref: "modal2",
                    staticStyle: {color: "black"},
                    attrs: {id: "modal2", title: "已归档项目", "hide-footer": !0}
                }, [a("table", {
                    staticClass: "table table-hover",
                    staticStyle: {"font-size": "14px"}
                }, [a("tbody", t._l(t.archiveProjectList, function (e, n) {
                    return a("tr", {key: n}, [a("td", [t._v(t._s(e.projectName))]), t._v(" "), a("td", [a("a", {attrs: {href: "#"}}, [t._v("撤销归档")]), t._v("   "), a("a", {
                        staticStyle: {color: "red"},
                        attrs: {href: "#"}
                    }, [t._v("彻底删除")])])])
                }))])])], 2)
            }, staticRenderFns: []
        }
    }, 978: function (t, e) {
        t.exports = {
            render: function () {
                var t = this, e = t.$createElement, a = t._self._c || e;
                return a("div", {staticClass: "menu-board"}, [a("div", {staticStyle: {"background-color": "#F5F5F5"}}, [t._v("\n    看板导航")]), t._v(" "), a("b-form-input", {
                    attrs: {
                        placeholder: "输入看板名称进行过滤...",
                        size: "sm"
                    }, model: {
                        value: t.term, callback: function (e) {
                            t.term = e
                        }, expression: "term"
                    }
                }), t._v(" "), a("div", {staticClass: "nav-board"}, [a("b-btn", {
                    directives: [{
                        name: "b-toggle",
                        rawName: "v-b-toggle.c1",
                        modifiers: {c1: !0}
                    }], attrs: {variant: "default"}
                }, [a("icon", {
                    attrs: {
                        name: "user",
                        scale: "1"
                    }
                }), t._v(" "), a("span", [t._v("个人看板")])], 1), t._v(" "), a("b-collapse", {attrs: {id: "c1"}}, [a("div", [a("b-list-group", {staticStyle: {margin: "7px"}}, t._l(t.personalResult, function (e, n) {
                    return a("b-list-group-item", {
                        key: n,
                        staticStyle: {"margin-bottom": "4px", height: "40px", "border-radius": "4px"},
                        attrs: {tag: "a"}
                    }, [a("span", {staticClass: "thumbnail"}), t._v(" "), a("span", {staticClass: "board-list-item-name"}, [t._v(t._s(e.boardName))])])
                }))], 1)])], 1), t._v(" "), t._l(t.searchResult, function (e, n) {
                    return a("div", {key: n, staticClass: "nav-board"}, [a("b-btn", {
                        directives: [{
                            name: "b-toggle",
                            rawName: "v-b-toggle",
                            value: "m-collapse" + n,
                            expression: "'m-collapse'+index"
                        }], attrs: {variant: "default"}
                    }, [a("icon", {
                        attrs: {
                            name: "cubes",
                            scale: "1"
                        }
                    }), t._v(" "), a("span", [t._v(t._s(e.projectName))])], 1), t._v(" "), a("b-collapse", {attrs: {id: "m-collapse" + n}}, [a("div", [a("b-list-group", {staticStyle: {margin: "7px"}}, t._l(e.boardList, function (e, n) {
                        return a("b-list-group-item", {
                            key: n,
                            staticStyle: {"margin-bottom": "4px", height: "40px", "border-radius": "4px"},
                            attrs: {tag: "a"}
                        }, [a("span", {staticClass: "thumbnail"}), t._v(" "), a("span", {staticClass: "board-list-item-name"}, [t._v(t._s(e.boardName))])])
                    }))], 1)])], 1)
                })], 2)
            }, staticRenderFns: []
        }
    }, 98: function (t, e, a) {
        "use strict";
        Object.defineProperty(e, "__esModule", {value: !0});
        var n = a(960), r = a.n(n);
        e.default = {components: {HeaderMenu: r.a}, name: "app"}
    }, 99: function (t, e, a) {
        "use strict";
        Object.defineProperty(e, "__esModule", {value: !0});
        var n = a(961), r = a.n(n), s = a(13);
        e.default = {
            components: {MenuBoard: r.a}, watch: {
                term: function (t) {
                    s.a.$emit("search", t)
                }
            }, data: function () {
                return {isSticky: !0, no_caret: !0, userAccount: "", term: ""}
            }, created: function () {
                var t = this;
                this.$ajax.post("/Login/getUserInfo").then(function (e) {
                    t.userAccount = e.data.data.userAccount
                }).catch(function (t) {
                    console.log(t)
                })
            }
        }
    }
}, [108]);
//# sourceMappingURL=app.4bc0fc18d60d3ead8fc3.js.map