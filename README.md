## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index: true|
|email|string|null: false, unique: true|
|password|string|null: false|
### Association
- has_many :messages
- has_many :users_groups
- has_many :groups, through: :users_groups

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null false, index: true|
### Association
- has_many :messages
- has_many :users_groups
- has_many :users, through: :users_groups

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text||
|image|text||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group

## users_groups
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
belongs_to :user
belongs_to :group