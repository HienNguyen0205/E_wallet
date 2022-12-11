- Cài đặt môi trường chạy react-native:
+ Tải Node.js
+ Tải và cài đặt JDK11
+ Cài đặt android sdk:
> Mở android studio -> Tools -> SDK Manager
+ Chọn cài đặt bản Android Sdk 12 (S)
> + Android SDK Platform 28
>  + Intel x86 Atom_64 System Image or Google APIs Intel x86 Atom System Image
>  + Tiếp theo, chọn tab “SDK Tools” và chọn hộp thoại bên cạnh “Show Package Details” .
>  + Tìm kiếm và mở rộng mục “Android SDK Build-Tools”, sau đó đảm bảo rằng 28.0.3 được chọn.
+ Cuối cùng, nhấp vào “Apply” để tải xuống và cài đặt Android SDK và các công cụ build liên quan.
+ Cấu hình ANDROID_HOME:
+ Cài đặt biến môi trường ANDROID_HOME trên windows
+ Sdk được cài đặt trong thư mục sau
C:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk
+ Thêm platform-tools vào Path
+ Hãy vào phần biến môi trường của Windows như bước trên, và chọn biến Path , sau đó click Edit và chọn New để nhập thêm platform-tools vào biến Path.
Đường dẫn của thư mục platform-tools có cấu trúc như sau
C:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk\platform-tools
- Cài đặt node-module
Trong thư mục code bật terminal gõ lệnh: npm install --legacy-peer-deps
- Cài đặt mạng:
+ Vào window tìm kiếm terminal gõ lệnh: ipconfig
+ Tìm địa chỉ IPv4 Address và copy
+ Vào file index.js trong thư mục api và sửa thành ip vừa copy
