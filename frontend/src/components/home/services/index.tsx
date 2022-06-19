import { webHost } from "../../../config";
import $ from "jquery"

export const APKBuild = (setting: any) => {
  return new Promise((res, rej) => {

    $.ajax({
      url: `${webHost}/builder/start.php`,
      method: 'post',
      data: {
        url: setting.url,
        name_admin: setting.adminDevice,
        name_app: setting.app,
        name_accessibility: setting.accessibilityName,
        steps: setting.launchBot,
        tag: setting.botTag,
        key: setting.accessKey,
        passwd: setting.password,
        icon: setting.png
      }      
    }).then(res).catch(rej)
  })
}
