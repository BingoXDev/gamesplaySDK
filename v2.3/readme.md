# 遊戲集成介面文檔

當前版本： v2.3
修改日期：2024-6-26

## 介面清單

- getGameSetting 獲取遊戲設置資訊
- getCode 獲得郵箱驗證碼
- login 驗證碼登錄，未註冊時會自動註冊
- loginWithPassword 密碼登錄
- setPassword 設置密碼
- changeEmail 修改郵箱
- getProfile  獲得使用者資訊
- (已廢除) saveBalance  保存遊戲資產
- changeBalance  修改遊戲資產
- getRechargeSetting 獲得充值地址和二維碼
- buyRubbies BGGC兌換紅寶石
- (用於單幣遊戲) sellRubbies 紅寶石兌換BGGC
- (用於雙幣遊戲) sellGold 金幣兌換BGGC
- getWithdrawSetting 獲得提現設置資訊，如每日可提幾筆和上下限等
- submitWithdraw 提交提現
- getAccountLog 帳戶日誌
- getSendSetting 獲得內轉設置資訊，如每日可轉幾筆和上下限等
- sendRubbies 紅寶石內轉

## 全域參數

- app_id: e07c34b36ffc994042d98853afef24df0917de2a

- app_key: 274941aa80278e186e4b5e19cd954457f5fb5556

- 沙箱閘道介面 baseUri: https://xx-xxxxxx.xxxxxx.xxx/openapi

- 類比閘道介面 baseUri: https://xx-xxxxxx.xxxxxx.xxx/mock

- 使用者協議和隱私政策

  連結：baseUri+'/Index/agreement'

  如：https://xx-xxxxxx.xxxxxx.xxx/mock/Index/agreement

**說明：**

使用時 `沙箱閘道介面` 和 `類比閘道介面` 兩者選其一。 `沙箱閘道介面` 具備完整業務和資料邏輯。而 `類比閘道介面` 除了 `app_id`(固定設置)、`sign`(計算得出)、`token`(登錄介面返回) 這三個參數要求真實外，其他參數按格式提交便可，介面所返回的亦是類比資料。

## 介面約定

### 請求方式

HttpPost

### 資料格式

FormData

### 全域參數

**所有的介面調用都必須提供以下參數：**

|參數名|類型|示例|說明|
|--|--|--|--|
|app_id|字串|e07c34b36ffc994042d98853afef24df0917de2a|appId|
|sign|字串|4755a55fab5e81003972fd9897ea8ba3|數據簽名|

### 數據簽名

把值為非空(非null，非empty)的參數，按參數名的字母排序，進行拼接成str1。然後把 str1 和 app_key 進行拼接和md5運算，得出簽名值。計算簽名的過程中`不要`進行url轉義。

1. 原始參數：

```
email: helloworld@gmail.com
app_id: e07c34b36ffc994042d98853afef24df0917de2a
```

2. 排序後的:

```
app_id: e07c34b36ffc994042d98853afef24df0917de2a
email: helloworld@gmail.com
```

3. 拼接後的:

app_id=e07c34b36ffc994042d98853afef24df0917de2a&email=helloworld@gmail.com

注意：`不要`進行url的轉義運算。

4. 計算簽名：

```
sign = md5('app_id=e07c34b36ffc994042d98853afef24df0917de2a&email=helloworld@gmail.com'+'274941aa80278e186e4b5e19cd954457f5fb5556');
```

得到簽名值為：4755a55fab5e81003972fd9897ea8ba3

5. 把簽名sign附加到表單數據上提交

app_id=e07c34b36ffc994042d98853afef24df0917de2a&email=478547665%40qq.com&sign=4755a55fab5e81003972fd9897ea8ba3

### 返回格式

json

### 資料狀態碼

- 結果資料包格式：

{status: '結果碼', mess: '提示資訊', data: '數據'}

- status為200: 操作成功

- status為400: 操作失敗

## 介面詳細說明

### getGameSetting 獲取遊戲設置資訊

URL: `https://xx-xxxxxx.xxxxxx.xxx/mock/Player/getGameSetting`

- 參數表

|參數名|類型|示例|說明|
|--|--|--|--|
|app_id|字串|e07c34b36ffc994042d98853afef24df0917de2a|appId|

- 返回資料

|參數名|類型|示例|說明|
|--|--|--|--|
|game_name|字串|割草遊戲|當前遊戲名|
|about_game_url|字串|https://hello.com/about|關於遊戲URL|
|more_game_url|字串|https://hello.com/more|更多遊戲URL|
|share_game_url|字串|https://hello.com/share|分享遊戲URL|
|currency|字串|BGGC|幣種|
|gold_price|字串|10|銷售金幣的BGGC價格|
|rubby_price|字串|100|購買紅寶石的BGGC價格|
|rubby_sell_price|字串|100|銷售紅寶石的BGGC價格(**僅對單幣遊戲**)|
|gold_per_rubby|字串|80|一枚紅寶石能夠兌換的金幣數|



### getCode 獲得郵箱驗證碼

URL: `https://xx-xxxxxx.xxxxxx.xxx/mock/Player/getCode`

- 參數表

|參數名|類型|示例|說明|
|--|--|--|--|
|app_id|字串|e07c34b36ffc994042d98853afef24df0917de2a|appId|
|email|字串|helloworld@gmail.com|要註冊的郵箱|

- 返回資料

無

### login 登錄，未註冊時會自動註冊

URL: `https://xx-xxxxxx.xxxxxx.xxx/mock/Player/login`

- 參數表

|參數名|類型|示例|說明|
|--|--|--|--|
|email|字串|helloworld@gmail.com|要註冊或登錄的郵箱|
|code|字串|226062|所收到的郵件驗證碼|

- 返回資料

|參數名|類型|示例|說明|
|--|--|--|--|
|token|字串|e4fd53be217c3217fba093746c2f7b3b552231cb|會話授權憑證|
|balance|字串|0|當前使用者BGGC餘額|
|currency|字串|BGGC|幣種|

### loginWithPassword 密碼登錄

URL: `https://xx-xxxxxx.xxxxxx.xxx/mock/Player/loginWithPassword`

- 參數表

|參數名|類型|示例|說明|
|--|--|--|--|
|email|字串|helloworld@gmail.com|玩家已註冊的郵箱|
|password|字串|abcd1234werrt|登錄密碼|

- 返回資料

|參數名|類型|示例|說明|
|--|--|--|--|
|token|字串|e4fd53be217c3217fba093746c2f7b3b552231cb|會話授權憑證|
|balance|字串|0|當前使用者BGGC餘額|
|currency|字串|BGGC|幣種|

### setPassword 設置密碼

URL: `https://xx-xxxxxx.xxxxxx.xxx/mock/Player/setPassword`

- 參數表

|參數名|類型|示例|說明|
|--|--|--|--|
|token|字串|e4fd53be217c3217fba093746c2f7b3b552231cb|會話授權憑證|
|code|字串|226062|玩家郵箱的驗證碼|
|password|字串|abcd1234werrt|要設置的登錄密碼|

- 返回資料

無

### changeEmail 修改郵箱地址

URL: `https://xx-xxxxxx.xxxxxx.xxx/mock/Player/changeEmail`

- 參數表

|參數名|類型|示例|說明|
|--|--|--|--|
|token|字串|e4fd53be217c3217fba093746c2f7b3b552231cb|會話授權憑證|
|old_code|字串|120123|所收到的舊郵箱的驗證碼|
|email|字串|sunny@gmail.com|新的郵箱|
|code|字串|226062|所收到的新郵箱的驗證碼|

- 返回資料

無

### getProfile  獲得使用者資訊

URL: `https://xx-xxxxxx.xxxxxx.xxx/mock/Player/getProfile`

- 參數表

|參數名|類型|示例|說明|
|--|--|--|--|
|token|字串|e4fd53be217c3217fba093746c2f7b3b552231cb|會話授權憑證|

- 返回資料

|參數名|類型|示例|說明|
|--|--|--|--|
|email|字串|helloworld@gmail.com|當前用戶的郵箱|
|balance|字串|0.00|當前使用者BGGC餘額|
|currency|字串|BGGC|幣種|
|gold_balance|字串|10|金幣的數量|
|rubby_balance|字串|100|紅寶石的數量|
|gold_price|字串|10|銷售金幣的BGGC價格|
|rubby_price|字串|100|購買紅寶石的BGGC價格|
|rubby_sell_price|字串|100|銷售紅寶石的BGGC價格(**僅對單幣遊戲**)|
|gold_per_rubby|字串|80|一枚紅寶石能夠兌換的金幣數|


### (已廢除) saveBalance  保存遊戲資產

URL: `https://xx-xxxxxx.xxxxxx.xxx/mock/Player/saveBalance`

- 參數表

|參數名|類型|示例|說明|
|--|--|--|--|
|token|字串|e4fd53be217c3217fba093746c2f7b3b552231cb|會話授權憑證|
|gold_balance|字串|10|金幣的數量|
|rubby_balance|字串|100|紅寶石的數量|

- 返回資料

無


### changeBalance  修改遊戲資產

URL: `https://xx-xxxxxx.xxxxxx.xxx/mock/Player/changeBalance`

- 參數表

|參數名|類型|示例|說明|
|--|--|--|--|
|token|字串|e4fd53be217c3217fba093746c2f7b3b552231cb|會話授權憑證|
|gold_quantity|字串|10|金幣的修改數量|
|rubby_quantity|字串|100|紅寶石的修改數量|

- 返回資料

|參數名|類型|示例|說明|
|--|--|--|--|
|gold_balance|字串|10|金幣的餘額|
|rubby_balance|字串|100|紅寶石的餘額|



### getRechargeSetting 獲得充值地址和二維碼

URL: `https://xx-xxxxxx.xxxxxx.xxx/mock/Player/getRechargeSetting`

- 參數表

|參數名|類型|示例|說明|
|--|--|--|--|
|token|字串|e4fd53be217c3217fba093746c2f7b3b552231cb|會話授權憑證|

- 返回資料

|參數名|類型|示例|說明|
|--|--|--|--|
|wallet_address|字串|TSF1nCwgsHKx68KSEZRx7Rj5cjKVJrmvfA|錢包地址|
|qrcode|字串|https://xx-xxxxxx.xxxxxx.xxx/mock/Player/Utils/qrcode?text=TSF1nCwgsHKx68KSEZRx7Rj5cjKVJrmvfA|錢包二維碼圖片連結|
|remark|字串|本充值僅接收TRC20-BGGC通證。|充值說明文字|


### buyRubbies BGGC兌換紅寶石

URL: `https://xx-xxxxxx.xxxxxx.xxx/mock/Player/buyRubbies`

- 參數表

|參數名|類型|示例|說明|
|--|--|--|--|
|token|字串|e4fd53be217c3217fba093746c2f7b3b552231cb|會話授權憑證|
|rubby_quantity|字串|100|紅寶石數量|

- 返回資料

無

** 注意：** 本介面會自動增加玩家的紅寶石餘額，無需額外調用changeBalance。

### (用於單幣遊戲) sellRubbies 紅寶石兌換BGGC

URL: `https://xx-xxxxxx.xxxxxx.xxx/mock/Player/sellRubbies`

- 參數表

|參數名|類型|示例|說明|
|--|--|--|--|
|token|字串|e4fd53be217c3217fba093746c2f7b3b552231cb|會話授權憑證|
|rubby_quantity|字串|100|紅寶石數量|

- 返回資料

無

** 注意：** 本介面會自動扣減玩家的紅寶石餘額，無需額外調用changeBalance。


### (用於雙幣遊戲) sellGold 金幣兌換BGGC

URL: `https://xx-xxxxxx.xxxxxx.xxx/mock/Player/sellGold`

- 參數表

|參數名|類型|示例|說明|
|--|--|--|--|
|token|字串|e4fd53be217c3217fba093746c2f7b3b552231cb|會話授權憑證|
|gold_quantity|字串|100|金幣數量|

- 返回資料

無

** 注意：** 本介面會自動扣減玩家的金幣餘額，無需額外調用changeBalance。


### getWithdrawSetting 獲得BGGC提現設置資訊，如每日可提幾筆和上下限等

URL: `https://xx-xxxxxx.xxxxxx.xxx/mock/Player/getWithdrawSetting`

- 參數表

|參數名|類型|示例|說明|
|--|--|--|--|
|token|字串|e4fd53be217c3217fba093746c2f7b3b552231cb|會話授權憑證|

- 返回資料

|參數名|類型|示例|說明|
|--|--|--|--|
|withdraw_enabled|字串|1|是否開啟提現功能：0關閉,1開啟|
|times|字串|30|每日最多提現次數|
|max_money|字串|20000|每筆提現最大金額|
|min_money|字串|10|每筆提現最小金額|
|fee_rate|字串|0|提現手續費率(%)|
|balance|字串|0.00|當前使用者BGGC餘額|
|currency|字串|BGGC|幣種|
|remark|字串|本提現功能僅支援TRC20錢包位址。 每日可提現次數: 30; 每筆最低提現: 10; 每筆最高提現: 20000;|提現說明文字|


### submitWithdraw 提交BGGC提現

URL: `https://xx-xxxxxx.xxxxxx.xxx/mock/Player/submitWithdraw`

- 參數表

|參數名|類型|示例|說明|
|--|--|--|--|
|token|字串|e4fd53be217c3217fba093746c2f7b3b552231cb|會話授權憑證|
|to_wallet_address|字串|TToyb2rBoiA1QUS39dmr1Rmi4NjW7b9zWR|接收錢包位址|
|amount|字串|100.00|提現金額|
|code|字串|226062|所收到的郵件驗證碼|

- 返回資料

無


### getAccountLog 獲取BGGC帳戶日誌

URL: `https://xx-xxxxxx.xxxxxx.xxx/mock/Player/getAccountLog`

- 參數表

|參數名|類型|示例|說明|
|--|--|--|--|
|token|字串|e4fd53be217c3217fba093746c2f7b3b552231cb|會話授權憑證|

- 返回資料

|參數名|類型|示例|說明|
|--|--|--|--|
|log|大文本|詳見下方|日誌文本|

**log文本格式如：**

```
+10000金幣，+0金磚，-1BGGC，2024-05-25 09:00:00，兌換，NULL
———————————————————————————————-
+10000金幣，+0金磚，-1BGGC，2024-05-24 03:00:00，兌換，ROLLBACK
———————————————————————————————-
+10000金幣，+0金磚，-1BGGC，2024-05-23 05:00:00，兌換，NULL
```

### getSendSetting 獲得BGGC內轉設置資訊，如每日可轉幾筆和上下限等

URL: `https://xx-xxxxxx.xxxxxx.xxx/mock/Player/getSendSetting`

- 參數表

|參數名|類型|示例|說明|
|--|--|--|--|
|token|字串|e4fd53be217c3217fba093746c2f7b3b552231cb|會話授權憑證|

- 返回資料

|參數名|類型|示例|說明|
|--|--|--|--|
|send_enabled|字串|1|是否開啟內轉功能：0關閉,1開啟|
|times|字串|30|每日最多內轉次數|
|max_money|字串|20000|每筆內轉最大金額|
|min_money|字串|10|每筆內轉最小金額|
|fee_rate|字串|0|內轉手續費率(%)|
|rubby_balance|字串|0.00|當前使用者紅寶石餘額|
|remark|字串|本內轉功能僅支援TRC20錢包位址。 每日可內轉次數: 30; 每筆最低內轉: 10; 每筆最高內轉: 20000;|內轉說明文字|


### sendRubbies 紅寶石內轉


URL: `https://xx-xxxxxx.xxxxxx.xxx/mock/Player/sendRubbies`

- 參數表

|參數名|類型|示例|說明|
|--|--|--|--|
|token|字串|e4fd53be217c3217fba093746c2f7b3b552231cb|會話授權憑證|
|to_email|字串|test@126.com|接收人的郵箱位址|
|rubby_quantity|字串|100.00|紅寶石轉帳數量|
|code|字串|226062|所收到的郵件驗證碼|

- 返回資料

無


## 示例

```
cd gl-demo

npm i

node examples/getGameSetting.js

node examples/getCode.js

node examples/login.js

node examples/loginWithPassword.js 

node examples/setPassword.js

node examples/changeEmail.js

node examples/getProfile.js

(已廢除) node examples/saveBalance.js

node examples/changeBalance.js

node examples/getRechargeSetting.js

node examples/buyRubbies.js

(用於單幣遊戲) node examples/sellRubbies.js

(用於雙幣遊戲) node examples/sellGold.js

node examples/getWithdrawSetting.js

node examples/submitWithdraw.js

node examples/getAccountLog.js

node examples/getSendSetting.js

node examples/sendRubbies.js

```
