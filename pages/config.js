var config = {
  basehost:'http://127.0.0.1:8000/',
  //basehost: 'http://www.robbyzhang.cn:80/',
  requestHeader: "application/x-www-form-urlencoded",
  urlpatterns:{
    login:'office/login/',
    enroll:'office/enroll/',
    taskList:'office/taskList/',
    order:'office/order/',
    repair:'office/repair/',
    repairEnd: 'office/repairEnd/'
  },
}

module.exports = config;