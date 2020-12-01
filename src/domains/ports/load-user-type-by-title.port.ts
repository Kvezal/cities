import { UserTypeEntity } from 'domains/entities';


export interface LoadUserTypeByTitlePort {
  loadUserTypeByTitle(title: string): Promise<UserTypeEntity>;
}
