; (function () {
  Vue.component('sort', {
    name: 'sort',
    props: ['sortArr'],
    data: function () {
      return {
        count: 0
      }
    },
    template: '\
        <div class="sort-box">\
          <div class="sort-item" v-for="item in sortArr" :key="item" :style="{height: (item * 10) + \'px\'}">\
          </div>\
          <button type="button" @click="bubbleSort">冒泡排序</button>\
          <button type="button" @click="insertSort">插入排序</button>\
          <button type="button" @click="quickSort">快速排序</button>\
        </div>',
    methods: {
      handlerSort: function () {
        this.$set(this.sortArr, j, this.sortArr[j + 1]);
        this.$set(this.sortArr, j + 1, temp);
      },
      // 冒泡排序
      bubbleSort: function () {
        var sortArrMark = this.sortArr.slice(0);
        var sortArrLen = sortArrMark.length;

        var i, j, stop, temp;
        for (i = 0; i < sortArrLen - 1; i++) {
          for (j = 0, stop = sortArrLen - 1 - i; j < stop; j++) {
            if (sortArrMark[j] > sortArrMark[j + 1]) {
              temp = sortArrMark[j];
              sortArrMark[j] = sortArrMark[j + 1];
              sortArrMark[j + 1] = temp;

              // 更新视图
              this.count += 1;
              setTimeout(function (j) {
                var temp = this.sortArr[j];

                this.$set(this.sortArr, j, this.sortArr[j + 1]);
                this.$set(this.sortArr, j + 1, temp);
              }.bind(this, j), this.count * 50);
            }
          }
        }
      },
      // 插入排序
      insertSort: function () {
        var sortArrMark = this.sortArr.slice(0);
        var sortArrLen = sortArrMark.length;

        var i, j, temp;
        for (i = 1; i < sortArrLen; i++) {
          var temp = sortArrMark[i];
          j = i - 1;

          for (; j >= 0 && sortArrMark[j] > temp; j--) {
            sortArrMark[j + 1] = sortArrMark[j];

            // 更新视图
            this.count += 1;
            setTimeout(function (j) {
              this.$set(this.sortArr, j + 1, this.sortArr[j]);
            }.bind(this, j), this.count * 100);
          }

          sortArrMark[j + 1] = temp;

          // 更新视图
          this.count += 1;
          setTimeout(function (j, temp) {
            this.$set(this.sortArr, j + 1, temp);
          }.bind(this, j, temp), this.count * 100);
        }
      },
      // 快速排序
      // FIXME：暂未实现
      quickSort: function (sortArr, len, isRight) {
        if (!sortArr || !Array.isArray(sortArr)) sortArr = this.sortArr;

        var sortArrMark = this.sortArr.slice(0);
        var sortArrLen = sortArrMark.length;

        if (sortArrLen <= 1) return sortArrMark.slice(0);

        var temp = [sortArrMark[0]];
        var left = [];
        var right = [];

        for (var i = 1; i < sortArrLen; i++) {
          sortArrMark[i] < temp[0]
            ? left.push(sortArrMark[i])
            : right.push(sortArrMark[i]);
        }

        this.count += 1;
        setTimeout(function (left, temp, right, start, len) {
          console.log('左侧数组：' + markLeft.toString());
          console.log('temp 值：' + markTemp[0]);
          console.log('右侧数组：' + markRight.toString());
          console.log('排序方位：' + (isRight ? '右侧' : '左侧'));

          var left = markLeft.map(function (item, index, arr) {
            return {
              value: item,
              mark: false
            };
          });
          var right = markRight.map(function (item, index, arr) {
            return {
              value: item,
              mark: false
            }
          });

          var len = markLeft.length + markTemp.length + markRight.length;
          this.sort = isRight ? this.sort.slice(0, len) : this.sort.slice(len);

          var thisSort = this.sort.map(function (item, index, arr) {
            return item.value;
          });
          console.log(thisSort.toString());

          if (isRight) {
            for (var a = 0; a < markLeft.length; a++) {
              this.sort.push({ value: markLeft[a], mark: false })
            }
            this.sort.push({ value: markTemp[0], mark: false })
            for (var b = 0; b < markRight.length; b++) {
              this.sort.push({ value: markRight[i], mark: false })
            }
          } else {
            for (var i = markRight.length - 1; i >= 0; i--) {
              this.sort.unshift({ value: markRight[i], mark: false })
            }
            this.sort.unshift({ value: markTemp[0], mark: false })
            for (var j = markLeft.length - 1; j >= 0; j--) {
              this.sort.unshift({ value: markLeft[j], mark: false })
            }
          }
          var consoleStr = this.sort.map(function (item, index, arr) {
            return item.value;
          });
          console.log(consoleStr.toString());
        }.bind(this, left, temp, right, start, len), this.count * 100);

        return this.quickSort(left, len).concat(temp.concat(this.quickSort(right, len, true)));
      }
    }
  });

  var sortArr = [];
  var num;

  do {
    num = parseInt(Math.random() * 33, 10);
    if (sortArr.indexOf(num) === -1) sortArr.push(num);
  } while (sortArr.length < 33);

  var app = new Vue({
    el: '#sort',
    data: {
      sortArr: sortArr
    }
  })
})();
