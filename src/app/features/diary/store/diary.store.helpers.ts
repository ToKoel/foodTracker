import { DiaryEntry } from './diary-entry.model';

// Function to create and share the JSON file
export function shareAppState(appState: DiaryEntry[]) {
  // const fileName = 'appState.json';
  // const documents = knownFolders.documents();
  // const filePath = path.join(documents.path, fileName);
  // const file = File.fromPath(filePath);
  //
  // // Convert the app state to a JSON string
  // const jsonString = JSON.stringify(appState);
  //
  // // Write the JSON string to the file
  // file.writeText(jsonString)
  //   .then(() => {
  //     // Initialize the ShareFile instance
  //     const shareFile = new ShareFile();
  //
  //     // Share the file
  //     shareFile.open({
  //       path: filePath,
  //       intentTitle: 'Share JSON File',
  //       rect: { // Optional iPad rectangle in screen coordinates
  //         x: 110,
  //         y: 110,
  //         width: 0,
  //         height: 0
  //       },
  //       options: true, // Optional iOS sharing options
  //       animated: true // Optional iOS animation flag
  //     });
  //   })
  //   .catch((error) => {
  //     console.error('Error writing JSON file:', error);
  //   });
}

