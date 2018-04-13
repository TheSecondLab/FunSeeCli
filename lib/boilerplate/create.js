const fs = require('fs');
const path = require('path');
const gitClone = require('git-clone');
const ora = require('ora');
const rimraf = require('rimraf');

module.exports = ({ projectName, antd }) => {
  // ProjectName是必须传入的参数， 不然无法创建项目
  if (!projectName) {
    console.error('Please enter a <Project Name> follow by \'create\'\nLike: funsee-hammer create exampleApp');
    return;
  }

  // 在当前文件夹下不能存在于projectName同名的文件夹
  if (fs.existsSync(projectName)) {
    console.error(`${projectName} is already existed under ${process.cwd()}`);
    return;
  }

  // 添加loading旋转图
  const spinner = ora('Downloading FunSee Boilerplate from Github').start();
  spinner.color = 'yellow';

  const gitAddress = antd ? 
                        'https://github.com/TheSecondLab/FunSeeAntdBoilerplate.git' :
                        'https://github.com/TheSecondLab/FunSeeBoilerplate.git';

  

  gitClone(gitAddress, projectName, { clone: true }, (err) => {
    if (err) {
      spinner.fail();
      console.error(`Create ${projectName} failed, Please check below errors: \n${err}`);
      return;
    }

    fs.mkdir(`${projectName}/dist`, 0777, function (err) {
      if(err) {
        console.log(`Create dist folder failed, Please check below errors: \n${err}`);
      }
    })
    spinner.start('Clean up the project structure');

    rimraf(`${projectName}/.git`, (e) => {
      if (e) {
        spinner.fail();
        console.error(`remove git files failed, Please check below errors: \n${e}`);
        return;
      }
      spinner.succeed(`Create '${projectName}' successful! Enjoy!`);
    });
  });
};
