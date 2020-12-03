import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../Service/task';

const getObservable = (collection: AngularFirestoreCollection<Task>) => {
  const subject = new BehaviorSubject([]);
  collection.valueChanges({ idField: 'id' }).subscribe((val: Task[]) => {
    subject.next(val);
  });
  return subject;
};

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  todo: BehaviorSubject<Task[]>;
  inProgress: BehaviorSubject<Task[]>;
  done: BehaviorSubject<Task[]>

  constructor(public store: AngularFirestore) {
    this.todo = getObservable(this.store.collection('todo'));
    this.inProgress = getObservable(this.store.collection('inProgress'));
    this.done = getObservable(this.store.collection('done'));
  }

  getData () {
    return {
      todo: this.todo,
      inProgress: this.inProgress,
      done: this.done
    }
  }

  createData (result) {
    this.store.collection('todo').add(result.task);
  }

  updateData (list, task) {
    this.store.collection(list).doc(task.id).update(task);
  }

  deleteData (list, task) {
    this.store.collection(list).doc(task.id).delete();
  }

  transactData (event, item) {
    this.store.firestore.runTransaction(() => {
      const promise = Promise.all([
        this.store.collection(event.previousContainer.id).doc(item.id).delete(),
        this.store.collection(event.container.id).add(item),
      ]);
      return promise;
    });
  }
 }
