;(function(){
    $(function () {

        var dbEvent = {
            add(target) {
                // 当前要增删改查的tr里的每个td的值
                var arr = this.foreach(target);
            },
            insert(target) {
                var arr = this.foreach(target);
            },
            copy(target) {
                var arr = this.foreach(target);
            },
            dlt(target) {
                var arr = this.foreach(target);
            },
            update(target) {
                var arr = this.foreach(target);
                console.log(arr)
            },
            getID(item) {
                var id = Number(item.childNodes[0].nodeValue.trim());
                return id;
            },
            foreach(target) {
                var arrVal = Array.prototype.map.call(target, (item, i) => {
                    if (i === 0) {
                        //获取id序号
                        var id = this.getID(item);
                        return id;
                    }
                    return item.childNodes[0].value;
                });
                return arrVal;
            }
        }
    
        //获取到的数据库数据  数组json格式  表格1数据
        var data1 = [
            {
                a: 1,
                b: 'ada',
                c: 'dwf',
                d: 'wfa',
                e: 'wfa',
                f: 'adawfa',
                g: 'adwfa',
                h: 'ada',
                i: 10,
                j: 10,
                k: 10,
                l: 'adawfa',
                m: 'adawfa'
            },
            {
                a: 2,
                b: 'ada',
                c: 'dwf',
                d: 'wfa',
                e: 'wfa',
                f: 'adawfa',
                g: 'adwfa',
                h: 'ada',
                i: 10,
                j: 10,
                k: 10,
                l: 'adawfa',
                m: 'adawfa'
            },
            {
                a: 3,
                b: 'ada',
                c: 'dwf',
                d: 'wfa',
                e: 'wfa',
                f: 'adawfa',
                g: 'adwfa',
                h: 'ada',
                i: 10,
                j: 10,
                k: 10,
                l: 'adawfa',
                m: 'adawfa'
            }
        ];
    
        //获取到的数据库数据  数组json格式  表格2数据
        var data2 = [
            {
                a: 1,
                b: 'ada',
                c: 'dwf',
                d: 1,
                e: 2,
                f: 3
            },
            {
                a: 1,
                b: 'ada',
                c: 'dwf',
                d: 1,
                e: 2,
                f: 3
            }
        ];
    
        // 表格单击的tr
        var globalTr;
    
        var html1 = template('table1', { list: data1 });
        var html2 = template('table2', { list: data2 });
    
        //模板引擎渲染第一个表格
        $('.table-tbody1').html(html1);
        //模板引擎渲染第二个表格
        $('.table-tbody2').html(html2);
    
        $('.header-right-logo-item').mouseenter(function () {
            $(this).children('.wrap-logo').fadeIn(400);
        }).mouseleave(function () {
            $(this).children('.wrap-logo').fadeOut(0);
        });
    
        $('.nav-tab-item').mouseenter(function () {
            $(this).find('a').children('.cp').css('visibility', 'visible');
        }).mouseleave(function () {
            $(this).find('a').children('.cp').css('visibility', 'hidden');
        }).click(function () {
            $(this).addClass('clickActive')
                .siblings('.nav-tab-item').removeClass('clickActive');
        });
    
        //表格切换
        $('.toggle-table').delegate('.nav-tab-item', 'click', function (e) {
            var name = $(e.target).get(0).innerText;
            name === '明细' ? $('table').eq(0).show() : $('table').eq(0).hide();
            name === '汇总' ? $('table').eq(1).show() : $('table').eq(1).hide();
        });
    
        // 表格双数行加背景
        $('table tr:even').css('backgroundColor', '#eee');
    
        $('.L-Sidebar-li').each(function () {
            $(this).mousedown(function (e) {
                e.stopPropagation();
                var child = $(this).children('.L-Sidebar-ul');
                var dataSet = $(this).attr('data-set');
                dataSet = !dataSet;
                child.hasClass('dn') ? child.removeClass('dn') : child.addClass('dn');
            });
        });
    
        $('td').mousedown(function () {
            $('td').css('border', '1px solid');
            $(this).css('border', '2px solid black');
            globalTr = $(this).parent().children('td');
        });
    
        //当修改了td的值 调用数据库修改数据
        $('td').siblings().change(function (e) {
            e.preventDefault();
            //修改数据
            dbEvent.update(globalTr);
        });
    
    
        $('tr').each(function () {
            $(this).children('td').eq(0).mousedown(function () {
                $('.first-td-ul').hide();
                $(this).children('.first-td-ul').show();
    
                //获取表格单击的tr下标  
                var index = $(this).parent().index();
                // console.log(index) 
                // 判断表格有多少行
                var rows = $(this).parents('table').find('tr').length;
    
                //单击到最后第二行tr
                index == rows - 3 ? $('.first-td-ul').css({
                    'right': '-155px',
                    'bottom': 0
                }) : $('.first-td-ul').css({
                    'right': '-155px',
                    'bottom': '-165px'
                });
            });
        });
    
    
        $('.first-td-ul').mousedown(function (e) {
            var textContent = $(e.target)[0].innerText;
            var rowIndex = $(this).parent().parent().index();
            // 进行数据库操作
            switch (textContent) {
                case '增行':
                    dbEvent.add(globalTr);
                    break;
                case '插行':
                    dbEvent.insert(globalTr);
                    break;
                case '复制行':
                    dbEvent.copy(globalTr);
                    break;
                case '删行':
                    dbEvent.dlt(globalTr);
                    break;
                default:
                    break;
            }
        });
    
        //单击任何地方  表格提示框隐藏
        $(document).mousedown(function (e) {
            if ($(e.target).is('.first-td')) {
                return false;
            } else {
                $('.first-td-ul').hide();
            }
            if (!$(e.target).is('td') && !$(e.target).is('.b-none')) {
                $('td').css('border', '1px solid');
            }
        });
    
        $(document).on('keyup', function (e) {
            $('.first-td-ul').each(function () {
                if (!$(this).is(':hidden')) {
                    if (e.altKey) {
                        switch (e.keyCode) {
                            case 49:
                                dbEvent.add(globalTr);
                                break;
                            case 50:
                                dbEvent.insert(globalTr);
                                break;
                            case 51:
                                dbEvent.copy(globalTr);
                                break;
                            case 52:
                                dbEvent.dlt(globalTr);
                                break;
                            default:
                                break;
                        }
                    }
                    return false;
                };
            });
        });
    });
}());