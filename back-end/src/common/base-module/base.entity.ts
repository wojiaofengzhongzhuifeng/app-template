import {Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  /*
  * todo 需要持续测试这样存储数据是否会产生bug
  * 实际的时间是  Thu Jul 20 2023 20:17:48 GMT+0800 (中国标准时间) {}
  * 数据库存储时间2023-07-20T12:17:48.442Z
  * 在前端可以直接通过 new Date('2023-07-20T12:17:48.442Z') 得到正确的时间 Thu Jul 20 2023 20:17:48 GMT+0800 (中国标准时间) {}
  * */
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updatedAt: Date;

  @Column({
    default: 0
  })
  isDel: number
}
