import { Component } from '@angular/core';
import { HomeService } from '../services/home-service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  teams: any[] = [];
  showForm = false;
  formMode: 'add' | 'edit' = 'add';
  formIndex: number | null = null;
  formTeam = this.getEmptyTeam();

  constructor(private homeService: HomeService) {}

  ngOnInit() {
    this.loadTeams();
  }

  getEmptyTeam() {
    return { name: '', player_amount: '', league: '', trophies: '' };
  }

  loadTeams() {
    this.homeService.getTeams().subscribe(response => {
      this.teams = response as any[];
    });
  }

  openForm(mode: 'add' | 'edit', index?: number) {
    this.formMode = mode;
    this.showForm = true;
    if (mode === 'edit' && index !== undefined) {
      this.formIndex = index;
      this.formTeam = { ...this.teams[index] };
    } else {
      this.formIndex = null;
      this.formTeam = this.getEmptyTeam();
    }
  }


  saveForm() {
    if (this.formMode === 'edit' && this.formIndex !== null) {
      const team = this.teams[this.formIndex];
      this.homeService.updateTeam(team.id, this.formTeam).subscribe(() => {
        this.loadTeams();
        this.closeForm();
      });
    } else {
      this.homeService.addTeam(this.formTeam).subscribe(() => {
        this.loadTeams();
        this.closeForm();
      });
    }
  }

  closeForm() {
    this.showForm = false;
    this.formIndex = null;
    this.formTeam = this.getEmptyTeam();
  }

  deleteTeam(index: number) {
    const team = this.teams[index];
    this.homeService.deleteTeam(team.id).subscribe(() => {
      this.loadTeams();
    });
  }
}
