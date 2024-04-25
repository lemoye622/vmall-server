import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NavigationMenu } from 'src/types/navigation_menu.interface';

@Injectable()
export class NavigationMenuService {
  constructor(
    @InjectModel('NavigationMenu')
    private navigationModel: Model<NavigationMenu>,
  ) {}

  async findAllActive(): Promise<NavigationMenu[]> {
    return this.navigationModel
      .find({ isActive: true })
      .sort({ order: 1 })
      .exec();
  }

  async findById(id: string): Promise<NavigationMenu> {
    return this.navigationModel.findById(id).exec();
  }

  async create(
    createNavigationDto: NavigationMenu | NavigationMenu[],
  ): Promise<NavigationMenu | NavigationMenu[]> {
    if (Array.isArray(createNavigationDto)) {
      return this.navigationModel.insertMany(createNavigationDto);
    } else {
      const newNavigation = new this.navigationModel(createNavigationDto);
      return newNavigation.save();
    }
  }

  async update(id: string, updateNavigationDto: any): Promise<NavigationMenu> {
    return this.navigationModel
      .findByIdAndUpdate(id, updateNavigationDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<NavigationMenu> {
    return this.navigationModel.findByIdAndDelete(id).exec();
  }
}
