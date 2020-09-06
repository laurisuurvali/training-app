import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Instruction} from '../../_models/instruction';

const API_URL = `${environment.apiUrl}admin/instruction/`;

@Injectable({
  providedIn: 'root'
})
export class InstructionService {


  constructor(private httpClient: HttpClient) {
  }

  getAllInstructions(): Observable<Instruction[]> {
    return this.httpClient.get<Instruction[]>(API_URL);
  }

  getInstructionById(exerciseId: number): Observable<Instruction> {
    return this.httpClient.get<Instruction>(API_URL + exerciseId);
  }

  getInstructionsByChallengeDayId(challengeId: string, weekNumberId: string, dayNumberId: string): Observable<Instruction[]> {
    const params = new HttpParams().set('challengeId', challengeId).set('weekNumberId', weekNumberId).set('dayNumberId', dayNumberId);
    return this.httpClient.get<Instruction[]>(API_URL, {params});
  }

  addInstruction(instruction: Instruction): any {
    return this.httpClient.post(API_URL, instruction);
  }

  updateInstruction(instruction: Instruction): any {
    return this.httpClient.put(API_URL + instruction.instructionId, instruction);
  }

  deleteInstruction(id: number): any {
    return this.httpClient.delete(API_URL + id);
  }
}
